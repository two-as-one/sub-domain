import Grammar from "./grammar"
import game from "../game"
import { DEBUG } from "globals/debug"
import { seed } from "utils/chance"

// this is where debug info is stored
const PARSER_DEBUG_INFO = []
export { PARSER_DEBUG_INFO }

class Subject {
  constructor() {
    this.change(game.nobody)
  }

  // change the entity of the subject
  change(entity) {
    this.entity = entity
    this.__pronounUsed = null
    this.__forcedSingular = false
  }

  // forces this subject to be singular
  // e.g: 'one of your arms' (even though arms is plural, we are only referring to one of them)
  forceSingular() {
    this.__forcedSingular = true
  }

  // mark a specific pronoun as having been used
  usePronoun(pronoun) {
    this.__pronounUsed = pronoun
  }

  get pronoun() {
    if (this.__pronounUsed) {
      return this.__pronounUsed
    }

    if (this.__forcedSingular) {
      return "it"
    }

    if (this.entity.person === "second") {
      return "you"
    }

    return this.entity.multiple ? "they" : "it"
  }

  // get a pronoun of the subject
  // type = subjective, objective, determiner, possessive or reflexive
  getPronoun(type = "subjective") {
    const plural = this.__forcedSingular ? false : this.entity.multiple
    const pronoun = Grammar.pronoun(
      type,
      plural,
      this.entity.person,
      this.entity.gender
    )
    this.usePronoun(pronoun)
    return pronoun
  }

  // conjugate a verb according to the subject and any used pronouns
  conjugate(verb) {
    return Grammar.conjugate(this.pronoun, verb)
  }
}

class Parser {
  constructor(string) {
    const regex = /(^|[^\\])(\[)([^\]]*)(\])/g
    let subject = new Subject()

    this.parsed = string.replace(regex, (match, a, b, snip) => {
      const previous = subject
      subject = new Subject()
      subject.change(previous.entity)

      // TODO: conditionals

      return a.replace("/", "") + Parser.__parse(snip, subject)
    })
  }

  // parse a snippet
  static __parse(snip, subject) {
    const hiddenRegex = /^\((.*)\)$/ // e.g: (you)
    const verbRegex = /^>/ // e.g: >verb
    const possessiveRegex = /'s\)?$/ // e.g: bob's, alice's

    // split snippet into its fragments and detect special cases
    const frags = snip.split(":").map(frag => ({
      raw: frag,
      frag: frag
        .replace(hiddenRegex, "$1")
        .replace(verbRegex, "")
        .replace(possessiveRegex, ""),
      possessive: possessiveRegex.test(frag),
      hidden: hiddenRegex.test(frag),
      verb: verbRegex.test(frag),
    }))

    // find out who and what we're talking about
    const possession = Parser.__possession(frags)
    if (possession) {
      subject.change(possession)
    } else {
      const person = Parser.__person(frags)
      if (person) {
        subject.change(person)
      }
    }

    // determine fragment types
    frags.forEach(frag => {
      if (frag.frag === "a" || frag.frag === "an") {
        frag.type = "a-an"
      } else if (frag.verb) {
        frag.type = "verb"
      } else if (Parser[frag.frag]) {
        frag.type = "dynamic"
      } else if (frag.entity) {
        frag.type = "entity"
      } else {
        frag.type = "static"
      }

      // the following frag types cannot be possessive
      switch (frag.type) {
        case "static":
        case "verb":
        case "a-an":
          frag.possessive = false
          break
      }
    })

    // parse static words
    frags
      .filter(frag => frag.type === "static")
      .forEach(frag => (frag.parsed = frag.frag))

    // parse dynamic
    frags.filter(frag => frag.type === "dynamic").forEach(frag => {
      const parsed = Parser[frag.frag](subject, frag, frags)

      if (parsed) {
        frag.parsed = parsed
      } else {
        frag.hidden = true
        frag.parsed = frag.frag
      }
    })

    // parse entities
    frags
      .filter(frag => frag.type === "entity")
      .forEach(frag => (frag.parsed = frag.entity.who))

    // parse possessive
    frags
      .filter(frag => frag.possessive)
      .forEach(frag => (frag.parsed = `${frag.parsed}'s`))

    // parse verbs
    frags
      .filter(frag => frag.type === "verb")
      .forEach(frag => (frag.parsed = subject.conjugate(frag.frag)))

    // parse a/an
    frags.forEach((frag, i) => {
      const next = frags[i + 1]

      if (next && frag.type === "a-an") {
        frag.parsed = Grammar.articlize(next.parsed).replace(next.parsed, "")
      }
    })

    // debug
    if (DEBUG.PARSER) {
      frags.forEach(frag => {
        PARSER_DEBUG_INFO.push({
          in: frag.raw,
          out: frag.hidden ? "_" : frag.parsed,
          type: frag.type,
          subject: subject,
          hidden: frag.hidden,
          length: frag.parsed.length,
        })

        frag.parsed = `[🡆${PARSER_DEBUG_INFO.length - 1}]${frag.parsed}`
      })
    }

    const parsed = frags
      .filter(frag => !frag.hidden || DEBUG.PARSER)
      .map(frag => frag.parsed)
      .join(" ")
      .trim()

    return parsed
  }

  // check whether something is an entity
  static __isEntity(item) {
    return Boolean(item && item.who)
  }

  // selects a top-level game entity based on common words referring to them
  static __select(key = "") {
    switch (key.toLowerCase()) {
      case "foe":
        if (game.scene && game.scene.enemy) {
          return game.scene.enemy
        } else {
          return Parser.__select("dave")
        }
      case "you":
        return game.player
      case "item":
        return (game.scene && game.scene.item) || game.rock
      case "bob":
        return game.bob
      case "alice":
        return game.alice
      case "charlie":
        return game.charlie
      case "dave":
        return game.dave
    }

    return null
  }

  // determine which person we're talking about
  static __person(frags) {
    for (let i = 0; i < frags.length; i++) {
      const frag = frags[i]

      if (!frag.possessive && Parser.__select(frag.frag)) {
        frag.entity = Parser.__select(frag.frag)
        return frag.entity
      }
    }

    return null
  }

  // determine what possession we're talking about
  static __possession(frags) {
    const [who, whoFrag] = Parser.__possesiveDeterminer(frags)

    if (!who) {
      return null
    }

    for (let i = 0; i < frags.length; i++) {
      const frag = frags[i]

      if (Parser.__isEntity(who[frag.frag])) {
        whoFrag.owner = who
        frag.entity = who[frag.frag]
        return frag.entity
      }
    }

    return null
  }

  static __condition(string) {
    let result = false
    try {
      result = new Function('"use strict";return (game.' + string + ")")()
    } catch (e) {
      console.error(`Invalid condition: ${string}`)
    }

    return result
  }

  // check if the snippet contains a possessive determiner
  // in that case we are talking about someone's possession
  static __possesiveDeterminer(frags) {
    for (let i = 0; i < frags.length; i++) {
      const frag = frags[i]

      if (frag.frag === "your") {
        return [Parser.__select("you"), frag]
      } else if (
        frag.frag === "their" ||
        frag.frag === "her" ||
        frag.frag === "his" ||
        frag.frag === "its"
      ) {
        return [Parser.__select("foe"), frag]
      } else if (frag.possessive && Parser.__select(frag.frag)) {
        return [Parser.__select(frag.frag), frag]
      }
    }

    return [null, null]
  }

  static item(subject) {
    return subject.entity.name
  }

  static damage(subject) {
    return `${Number(subject.entity.damaged) || 0} damage`
  }

  static lust(subject) {
    return `${Number(subject.entity.aroused) || 0} lust`
  }

  static xp() {
    return `${Number(Parser.__select("you").xpGained) || 0}xp`
  }

  static time() {
    let time = game.world.time.hour

    if (time < 12) {
      time = `${time} am`
    } else if (time === 12) {
      time = `noon`
    } else if (time === 24) {
      time = `midnight`
    } else {
      time = `${time - 12} pm`
    }

    return time
  }

  static area() {
    return game.world.area.name
  }

  static title(subject) {
    return subject.entity.title
  }

  static that(subject) {
    return subject.entity.that
  }

  static those(subject) {
    return subject.entity.that
  }

  static number(subject) {
    return subject.entity.number
  }

  static each(subject) {
    if (subject.entity.quantity === 2) {
      return "both"
    } else if (subject.entity.multiple) {
      return "each"
    } else {
      return ""
    }
  }

  static "each of"(subject) {
    if (subject.entity.quantity === 2) {
      return "both of"
    } else if (subject.entity.multiple) {
      return "each of"
    } else {
      return ""
    }
  }

  static "every one of"(subject) {
    if (subject.entity.quantity === 2) {
      return "both of"
    } else if (subject.entity.multiple) {
      return "every one of"
    } else {
      return ""
    }
  }

  static "all of"(subject) {
    if (subject.entity.quantity === 2) {
      return "both of"
    } else if (subject.entity.multiple) {
      return `all ${subject.entity.number} of`
    } else {
      return ""
    }
  }

  static "one of"(subject) {
    subject.forceSingular()
    return subject.entity.one
  }

  static "two of"(subject) {
    return subject.entity.two
  }

  static "three of"(subject) {
    return subject.entity.three
  }

  static "four of"(subject) {
    return subject.entity.four
  }

  static adjective(subject) {
    return subject.entity.adjective
  }

  static type(subject) {
    return subject.entity.type === "human" ? "" : subject.entity.type
  }

  static size(subject) {
    return subject.entity.humanReadableSize || ""
  }

  static they(subject) {
    return subject.getPronoun("subjective")
  }

  static them(subject) {
    return subject.getPronoun("objective")
  }

  static their(subject, frag, frags) {
    // if the subject belongs to someone AND the fragments already contain a subject
    // then the `their` refers to the subject's owner
    if (subject.entity.owner && frags.map(f => f.type).includes("entity")) {
      return subject.entity.owner.their
    }

    return subject.getPronoun("determiner")
  }

  static theirs(subject) {
    return subject.getPronoun("possessive")
  }

  static themself(subject) {
    return subject.getPronoun("reflexive")
  }

  static who(subject) {
    return subject.entity.who
  }

  static you() {
    return Parser.__select("you").who
  }

  static your() {
    return Parser.__select("you").their
  }

  static foe() {
    return Parser.__select("foe").who
  }

  static boy(subject) {
    switch (subject.entity.gender) {
      case "male":
        return "boy"
      case "female":
        return "girl"
      case "neutral":
        return "person"
      default:
        return "thing"
    }
  }

  static girl(subject) {
    return Parser.boy(subject)
  }
}

export function parse(text = "") {
  if (DEBUG.PARSER_SEED) {
    seed(DEBUG.PARSER_SEED)
  }

  const p = new Parser(text)
  return p.parsed
}
