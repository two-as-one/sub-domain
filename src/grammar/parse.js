import Grammar from "./grammar"
import game from "../game"

// TODO [size] modifier -> '12 inch', 'B-cup'

class Parser {
  constructor(string, subject) {
    const regex = /(\[)([^\]]*)(\])/g
    const whoRegex = /(.*)\((.*)\)$/
    const conditionRegex = /(.*)(\?|!)(.*)\|(.*)$/

    this.parsed = string.replace(regex, (match, a, snip) => {
      // check if the selector has a specific target
      let specific = snip.match(whoRegex)
      if (specific) {
        snip = specific[1]
        specific = specific[2]
      }

      // conditionals
      const condition = snip.match(conditionRegex)

      if (condition) {
        let result = this.__find(condition[1], subject)

        // reverse condition
        if (condition[2] === "!") {
          result = !result
        }

        if (result) {
          snip = condition[3]
        } else {
          snip = condition[4]
        }
      }

      const parsed = this.__parse(snip, subject, specific)
      subject = parsed[1]

      return parsed[0]
    })

    // articlize [a] and [an]
    this.parsed = this.parsed.replace(
      /\[(a|an)\] (\w+)/g,
      (match, article, word) => Grammar.articlize(word)
    )
  }

  // parse a snippet
  __parse(snip, subject, specific) {
    // split selector into its fragments
    const frags = snip.split(":")

    // use the last fragment as the target
    const target = frags[frags.length - 1]

    // subject modifiers
    // the presence of these fragments changes the subject of the sentence
    if (frags.includes("your")) {
      subject = this.__select("you")
    }

    if (frags.includes("their")) {
      subject = this.__select("foe")
    }

    // check for specific subject
    if (specific) {
      specific = this.__find(specific, subject)

      if (typeof specific === "object") {
        subject = specific
      }
    }

    // find the actual subject
    const object = this.__find(target, subject)
    if (typeof object === "object") {
      subject = object
    }

    // construct words, applying modifiers
    const parsed = frags
      .map(mod => {
        try {
          if (this[mod]) {
            return this[mod](subject, target, specific)
          } else if (mod === target && subject) {
            return subject.who
          } else {
            return mod
          }
        } catch (e) {
          console.warn("Parser Error: Failed to apply mod: " + mod)
          return ""
        }
      })
      .join(" ")

    // TODO: prevent duplicate adjectives showing up
    // TODO: prevent type being used as adjective, if type is also part of the frag

    return [parsed, subject]
  }

  __find(key, subject) {
    const keys = key.split(".")

    // eslint-disable-next-line no-cond-assign
    while ((key = keys.shift())) {
      if (subject && key in subject) {
        subject = subject[key]
      } else {
        subject = this.__select(key)
      }
    }

    return subject
  }

  __select(key) {
    switch (key) {
      case "foe":
      case "their":
        return game.scene.enemy
      case "you":
      case "your":
      case "yours":
        return game.player
    }

    return null
  }

  a() {
    return "[a]"
  }

  an() {
    return "[an]"
  }

  title(subject) {
    return subject.title
  }

  that(subject) {
    return subject.that
  }

  those(subject) {
    return subject.that
  }

  number(subject) {
    return subject.number
  }

  "each of"(subject) {
    return subject.quantity > 1 ? "each of" : ""
  }

  "every one of"(subject) {
    return subject.quantity > 1 ? "every one of" : ""
  }

  "all of"(subject) {
    return subject.all
  }

  "one of"(subject) {
    return subject.one
  }

  "two of"(subject) {
    return subject.two
  }

  "three of"(subject) {
    return subject.three
  }

  "four of"(subject) {
    return subject.four
  }

  adjective(subject) {
    return subject.adjective
  }

  type(subject) {
    return subject.type === "human" ? "" : subject.type
  }

  they(subject) {
    return subject.they
  }

  them(subject) {
    return subject.them
  }

  their(subject) {
    subject = subject.owner ? subject.owner : subject

    return subject.their
  }

  theirs(subject) {
    return subject.theirs
  }

  themself(subject) {
    return subject.themself
  }

  who(subject) {
    return subject.who
  }

  whose(subject, target, specific) {
    // if there is a specific subject, use that
    if (specific) {
      subject = specific

      // otherwise if the subject has an owner use that
    } else if (subject.owner) {
      subject = subject.owner
    }

    if (target !== "whose" && subject === game.player) {
      return "your"
    } else if (subject.owner && specific) {
      return `${this.whose(subject.owner, target)} ${subject.whose}`
    } else {
      return subject.whose
    }
  }

  you() {
    return game.player.who
  }

  your() {
    return "your"
  }

  foe() {
    return game.scene.enemy.who
  }
}

export function parse(text = "") {
  try {
    const p = new Parser(text)
    return p.parsed
  } catch (e) {
    console.warn("Parser Error:" + text)
    return text
  }
}
