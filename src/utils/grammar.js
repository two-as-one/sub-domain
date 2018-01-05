import Articles from "articles"
import Chance from "chance"

const chance = new Chance()

export default class Grammar {
  /** converts a numeric number between 0-1 into its word */
  static number(value) {
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
  static ordinal(value) {
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
  static articlize(word) {
    return Articles.articlize(word)
  }

  /** collapses duplicate spaces */
  static trim(string) {
    return (string || "").replace(/  +/g, " ")
  }

  /** return a random element from an array */
  static random(list) {
    return chance.pickone(list)
  }

  /** converts cm into feet and inches as a string */
  static toFt(cm) {
    const realFeet = cm * 0.3937 / 12
    const feet = Math.floor(realFeet)
    const inches = Math.round((realFeet - feet) * 12)
    return feet + "&prime;" + inches + "&Prime;"
  }

  /** converts kg into lbs as a string */
  static toLbs(kg) {
    return Math.round(kg * 2.20462) + " lbs"
  }

  /** capitalizes the first letter of a string */
  static capitalize(words) {
    return words.charAt(0).toUpperCase() + words.slice(1)
  }
}
