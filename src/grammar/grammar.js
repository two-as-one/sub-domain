import Articles from "articles"
import Chance from "chance"
import { Contractions } from "contractions"
import conjugate from "conjugate"
import number from "number-to-words"
import { parse } from "./parse"
import pluralize from "pluralize"
import showdown from "showdown"

const converter = new showdown.Converter()

/** custom list of contractions as some of the default ones are very old-school */
const contractions = new Contractions({
  "aren't": "are not",
  "can't": "can not",
  "could've": "could have",
  "couldn't": "could not",
  "didn't": "did not",
  "doesn't": "does not",
  "don't": "do not",
  "hadn't": "had not",
  "hasn't": "has not",
  "haven't": "have not",
  "he'd": "he would",
  "he's": "he is",
  "how'd": "how did",
  "how's": "how is",
  "i'd": "i would",
  "i'll": "i will",
  "i'm": "i am",
  "i've": "i have",
  "isn't": "is not",
  "it'd": "it would",
  "it'll": "it will",
  "it's": "it is",
  "let's": "let us",
  "she'd": "she would",
  "she'll": "she will",
  "she's": "she is",
  "should've": "should have",
  "shouldn't": "should not",
  "someone's": "someone is",
  "that's": "that is",
  "there'd": "there would",
  "there's": "there is",
  "they'd": "they would",
  "they're": "they are",
  "they've": "they have",
  "wasn't": "was not",
  "we'd": "we would",
  "we'll": "we will",
  "we're": "we are",
  "we've": "we have",
  "weren't": "were not",
  "what's": "what is",
  "what've": "what have",
  "where's": "where is",
  "who's": "who is",
  "won't": "will not",
  "would've": "would have",
  "wouldn't": "would not",
  "you'd": "you would",
  "you'd've": "you would have",
  "you'll": "you will",
  "you're": "you are",
  "you've": "you have"
})

//add irregular plurals
pluralize.addIrregularRule("isn't", "aren't")
pluralize.addIrregularRule("hasn't", "haven't")

const chance = new Chance()

const PRONOUNS = {
  first: {
    singular: {
      subjective: "I",
      objective: "me",
      determiner: "my",
      possessive: "mine",
      reflexive: "myself"
    },
    plural: {
      subjective: "we",
      objective: "us",
      determiner: "our",
      possessive: "ours",
      reflexive: "ourselves"
    }
  },
  second: {
    singular: {
      subjective: "you",
      objective: "you",
      determiner: "your",
      possessive: "yours",
      reflexive: "yourself"
    },
    plural: {
      subjective: "you",
      objective: "you",
      determiner: "your",
      possessive: "yours",
      reflexive: "yourself"
    }
  },
  third: {
    singular: {
      neutral: {
        subjective: "they",
        objective: "them",
        determiner: "their",
        possessive: "theirs",
        reflexive: "themself"
      },
      female: {
        subjective: "she",
        objective: "her",
        determiner: "her",
        possessive: "hers",
        reflexive: "herself"
      },
      male: {
        subjective: "he",
        objective: "him",
        determiner: "his",
        possessive: "his",
        reflexive: "himself"
      },
      none: {
        subjective: "it",
        objective: "it",
        determiner: "its",
        possessive: "its",
        reflexive: "itself"
      }
    },
    plural: {
      subjective: "they",
      objective: "them",
      determiner: "their",
      possessive: "theirs",
      reflexive: "themselves"
    }
  }
}

/** return the correct pronoun based on a set of criteria */
function pronoun(type, plural = false, person = "third", gender = "neutral") {
  let p = PRONOUNS[person]
  p = p && p[plural ? "plural" : "singular"]

  if (person === "third" && !plural) {
    p = p && p[gender]
  }

  p = p && p[type]

  return p
}

export default class Grammar {
  //mixes a class with built-in Grammar capability
  static mix(SuperClass) {
    Object.defineProperty(SuperClass.prototype, "who", {
      get() {
        if (this.person === "second") {
          return pronoun("subjective", this.multiple, this.person, this.gender)
        } else if (this.name) {
          return this.name
        } else {
          return `the ${this.title}`
        }
      }
    })

    Object.defineProperty(SuperClass.prototype, "whose", {
      get() {
        if (this.person === "second") {
          return pronoun("possessive", this.multiple, this.person, this.gender)
        } else {
          return `${this.who}'s`
        }
      }
    })

    /** he/she/they/it */
    Object.defineProperty(SuperClass.prototype, "they", {
      get() {
        return pronoun("subjective", this.multiple, this.person, this.gender)
      }
    })

    /** him/her/them/it */
    Object.defineProperty(SuperClass.prototype, "them", {
      get() {
        return pronoun("objective", this.multiple, this.person, this.gender)
      }
    })

    /** his/her/their/its */
    Object.defineProperty(SuperClass.prototype, "their", {
      get() {
        return pronoun("determiner", this.multiple, this.person, this.gender)
      }
    })

    /** his/hers/theirs/its */
    Object.defineProperty(SuperClass.prototype, "theirs", {
      get() {
        return pronoun("possessive", this.multiple, this.person, this.gender)
      }
    })

    /** himself/herself/themself/itself */
    Object.defineProperty(SuperClass.prototype, "themself", {
      get() {
        return pronoun("reflexive", this.multiple, this.person, this.gender)
      }
    })

    /** conjugate a verb for this entity */
    SuperClass.prototype.verb = function(verb, full) {
      return Grammar.verb(this.they, verb, full)
    }
  }

  /** conjugates a verb based on noun/pronoun */
  static verb(who, verb, full = true) {
    who = who.trim()

    if (!Grammar.isPronoun(who)) {
      const pronoun = pluralize.isPlural(who) ? "they" : "he"
      let out = conjugate(pronoun, verb)
      if (full) {
        out = `${who} ${out}`
      }
      return out
    }

    return conjugate(who, verb, full)
  }

  /** check whether a word is a pronoun */
  static isPronoun(word = "") {
    return (
      ["i", "you", "he", "she", "it", "we", "they"].indexOf(
        word.toLowerCase().trim()
      ) > -1
    )
  }

  /** converts a numeric number between 0-1 into its word */
  static number(value = 0) {
    return number.toWords(value)
  }

  /** converts a numeric number between 1-10 into its ordinal word */
  static ordinal(value = 0) {
    return number.toWordsOrdinal(value)
  }

  /** adds an article to a word */
  static articlize(word = "") {
    return Articles.articlize(word)
  }

  static an(word) {
    return Grammar.articlize(word)
  }

  static a(word) {
    return Grammar.articlize(word)
  }

  /** make a word plural */
  static pluralize(word = "") {
    return pluralize(word)
  }

  /** collapses duplicate spaces */
  static trim(string = "") {
    return string.replace(/  +/g, " ")
  }

  static collapse(string = "") {
    return string
      .replace(/\n/g, " ")
      .replace(/\r/g, " ")
      .trim()
  }

  /** return a random element from an array */
  static random(list = []) {
    return chance.pickone(list)
  }

  /** converts cm into feet and inches as a string */
  static toFt(cm = 0) {
    const realFeet = cm * 0.3937 / 12
    const feet = Math.floor(realFeet)
    const inches = Math.round((realFeet - feet) * 12)
    return feet + "&prime;" + inches + "&Prime;"
  }

  /** converts kg into lbs as a string */
  static toLbs(kg = 0) {
    return Math.round(kg * 2.20462) + " lbs"
  }

  /** capitalizes the first letter of a string */
  static capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  /** capitalizes the first word of each sentence */
  static sentences(text = "") {
    return text.replace(
      /.+?[.?!](\s|$)/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1)
    )
  }

  /** wraps a snippet of text in a paragraph */
  static p(text = "") {
    return `<p>${text}</p>`
  }

  /** finds quotes in text and replaces them with <q> tags */
  static quote(text = "") {
    return text.replace(/"(.*?)"/g, (match, inner) => `<q>${inner}</q>`)
  }

  /** removes `undefined` */
  static unundefined(text = "") {
    return text.replace("undefined", "")
  }

  /**
   * contracts words such as `does not` into `doesn't`
   * if you want to specifically prevent a word to be contracted, you can separate them with a /
   * if the words separated by a slash don't contract, the / will be preserved
   * examples:
   *   "i have" -> "i've"
   *   "i/have" -> "i have"
   *   "and/or" -> "and/or"
   */
  static contract(text = "") {
    text = contractions.contract(text)

    text = text.replace(/(\w*\s?\/\s?\w*)/g, match => {
      const word = match.replace(/\s?\/\s?/g, " ")
      if (contractions.contract(word) !== word) {
        return word
      } else {
        return match
      }
    })

    return text
  }

  /**
   * conjugates all verbs in a blob of text
   * mark the subject by trailing it with a `~`
   * mark the verb by prepending it with `>`
   * When conjugating a simple subject and verb` you can just use `subject~>verb`
   * A single subject can conjugate multiple verbs
   * examples:
   *     "he~>walk"                        -> "he walks"
   *     "they~>walk"                      -> "they walk"
   *     "the minotaur~ viscously >slam"   -> "the minotaur viscously slams"
   *     "the minotaurs~ viscously >slam"  -> "the minotaurs viscously slam"
   */
  static conjugate(text = "") {
    let subject
    return text
      .replace(/>(\w*)/g, (match, verb, i, string) => {
        string = string.slice(0, i).match(/\w*~/g)
        if (string) {
          subject = string.pop().replace(/~$/, "")
        }

        if (subject) {
          return Grammar.verb(subject, verb, false)
        } else {
          return verb
        }
      })
      .replace(/(\w*)~/g, (match, subject) => subject + " ")
  }

  /**
   * grammatically cleans up text and wraps it in paragraphs
   * use a double new line to introduce a new paragraph
   * @param  {String} text - the text to clean up
   * @return {String}      the cleaned up text
   */
  static clean(text = "") {
    text = parse(text)
      .split(/\n\n|\r\r/)
      .map(text => parse(text))
      .map(text => Grammar.collapse(text))
      .map(text => Grammar.unundefined(text))
      .filter(text => text)
      .map(text => Grammar.conjugate(text))
      .map(text => Grammar.trim(text))
      .map(text => Grammar.sentences(text))
      .map(text => Grammar.contract(text))
      .map(text => Grammar.quote(text))
      .map(text => converter.makeHtml(text))

    return text.join("")
  }
}

if (process.env.dev) {
  window.Grammar = Grammar
}
