import Articles from "articles"
import Chance from "chance"
import { Contractions } from "contractions"
import conjugate from "conjugate"
import pluralize from "pluralize"

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
    subjective: "I",
    objective: "me",
    possessive: "my",
    reflexive: "myself"
  },
  second: {
    subjective: "you",
    objective: "you",
    possessive: "your",
    reflexive: "yourself"
  },
  third: {
    neutral: {
      subjective: "they",
      objective: "them",
      possessive: "their",
      reflexive: "themself"
    },
    female: {
      subjective: "she",
      objective: "her",
      possessive: "her",
      reflexive: "herself"
    },
    male: {
      subjective: "he",
      objective: "him",
      possessive: "his",
      reflexive: "himself"
    },
    none: {
      subjective: "it",
      objective: "it",
      possessive: "its",
      reflexive: "itself"
    }
  }
}

export default class Grammar {
  constructor(owner) {
    this.owner = owner
  }

  /** Returns the name of this creature or 'the {title}' */
  get who() {
    if (this.owner.person === "second") {
      return PRONOUNS[this.owner.person]["subjective"]
    } else if (this.owner.name) {
      return this.owner.name
    } else {
      return `the ${this.owner.title}`
    }
  }

  get whose() {
    if (this.owner.person === "second") {
      return PRONOUNS[this.owner.person]["possessive"]
    } else {
      return `${this.owner.who}'s`
    }
  }

  /** he/she/they/it */
  get they() {
    if (this.owner.person === "third") {
      return PRONOUNS[this.owner.person][this.owner.gender]["subjective"]
    } else {
      return PRONOUNS[this.owner.person]["subjective"]
    }
  }

  /** him/her/them/it */
  get them() {
    if (this.owner.person === "third") {
      return PRONOUNS[this.owner.person][this.owner.gender]["objective"]
    } else {
      return PRONOUNS[this.owner.person]["objective"]
    }
  }

  /** his/her/their/its */
  get their() {
    if (this.owner.person === "third") {
      return PRONOUNS[this.owner.person][this.owner.gender]["possessive"]
    } else {
      return PRONOUNS[this.owner.person]["possessive"]
    }
  }

  /** himself/herself/themself/itself */
  get themself() {
    if (this.owner.person === "third") {
      return PRONOUNS[this.owner.person][this.owner.gender]["reflexive"]
    } else {
      return PRONOUNS[this.owner.person]["reflexive"]
    }
  }

  /** conjugates a verb based on noun/pronoun */
  static verb(who, verb, both = true) {
    if (!Grammar.isPronoun(who)) {
      let out = conjugate("he", verb)
      if (both) {
        out = `${who} ${out}`
      }
      return out
    }

    return conjugate(who, verb, both)
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
    switch (value) {
      case 0:
        return "zero"
      case 1:
        return "one"
      case 2:
        return "two"
      case 3:
        return "three"
      case 4:
        return "four"
      case 5:
        return "five"
      case 6:
        return "six"
      case 7:
        return "seven"
      case 8:
        return "eight"
      case 9:
        return "nine"
      case 10:
        return "ten"
      default:
        return value
    }
  }

  /** converts a numeric number between 1-10 into its ordinal word */
  static ordinal(value = 0) {
    switch (value) {
      case 1:
        return "first"
      case 2:
        return "second"
      case 3:
        return "third"
      case 4:
        return "fourth"
      case 5:
        return "fifth"
      case 6:
        return "sixth"
      case 7:
        return "seventh"
      case 8:
        return "eighth"
      case 9:
        return "ninth"
      case 10:
        return "tenth"
      default:
        return value
    }
  }

  /** adds an article to a word */
  static articlize(word = "") {
    return Articles.articlize(word)
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

  /** contracts words such as `does not` into `doesn't` */
  static contract(text = "") {
    return contractions.contract(text)
  }

  /** provides a grammatically cleaned paragraph of text */
  static clean(text = "") {
    text = Grammar.collapse(text)
    text = Grammar.trim(text)
    text = Grammar.sentences(text)
    text = Grammar.contract(text)
    text = Grammar.p(text)

    return text
  }
}
