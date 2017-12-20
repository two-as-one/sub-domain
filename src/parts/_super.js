import Articles from "articles"
import Chance from "chance"
import Saveable from "save/saveable"

const chance = new Chance()

export default class Part extends Saveable {
  constructor(owner) {
    super()
    this.owner = owner
  }

  get savedAttribute() {
    return "stats"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
      size: 0,
      sensitivity: 0.25
    })
  }

  //only return a description if the player has this part
  get description() {
    return ""
  }

  //define a message for when the player attempts to seduce using this part
  get seductionMessage() {
    return ""
  }

  //return true if the player can seduce with this part
  get canSeduce() {
    return false
  }

  get size() {
    return this.stats.size
  }

  set size(val) {
    this.stats.size = Math.round(val * 100) / 100
  }

  get quantity() {
    return this.stats.quantity
  }

  set quantity(val) {
    this.stats.quantity = Math.floor(val)
  }

  get sensitivity() {
    return this.stats.sensitivity
  }

  set sensitivity(val) {
    this.stats.sensitivity = val
  }

  /**
   * Check whether there are multiple parts of this type
   * @type {Boolean}
   */
  get multiple() {
    return this.quantity !== 1
  }

  grow() {
    this.size += this.growth

    if (this.quantity === 0) {
      this.add()
    }
  }

  shrink() {
    this.size -= this.growth
    this.size = Math.max(0, this.size)

    if (this.size === 0) {
      this.quantity = 0
    }
  }

  add() {
    this.quantity += 1

    //set size to 1 if it's the first of its kind
    if (this.quantity === 1) {
      this.size = 1
    }
  }

  remove() {
    this.quantity -= 1
    this.quantity = Math.max(0, this.quantity)
  }

  get has() {
    return this.quantity > 0 && this.size > 0
  }

  //determine by how much this part grows or shrinks
  get growth() {
    return 1
  }

  //define one or more singulars of this part
  get singular() {
    return "part"
  }

  //define one or more plurals for this part
  get plural() {
    return "parts"
  }

  get pluralized() {
    if (this.quantity === 1) {
      return this.singular
    } else {
      return this.plural
    }
  }

  get adjective() {
    return "sexy"
  }

  get your() {
    return Part.trim(
      `your ${Part.random(["", this.adjective])} ${this.pluralized}`
    )
  }

  get all() {
    if (this.quantity === 1) {
      return this.your
    } else if (this.quantity === 2) {
      return Part.trim(`both of ${this.your}`)
    } else {
      return Part.trim(`all ${Part.random(["", this.number])} of ${this.your}`)
    }
  }

  get one() {
    if (this.quantity > 1) {
      return Part.trim(
        `one of your ${Part.random(["", this.number])} ${Part.random([
          "",
          this.adjective
        ])} ${this.pluralized}`
      )
    } else {
      return this.all
    }
  }

  get two() {
    if (this.quantity > 2) {
      return Part.trim(
        `two of your ${Part.random(["", this.number])} ${Part.random([
          "",
          this.adjective
        ])} ${this.pluralized}`
      )
    } else {
      return this.all
    }
  }

  get three() {
    if (this.quantity > 3) {
      return Part.trim(
        `three of your ${Part.random(["", this.number])} ${Part.random([
          "",
          this.adjective
        ])} ${this.pluralized}`
      )
    } else {
      return this.all
    }
  }

  get four() {
    if (this.quantity > 4) {
      return Part.trim(
        `four of your ${Part.random(["", this.number])} ${Part.random([
          "",
          this.adjective
        ])} ${this.pluralized}`
      )
    } else {
      return this.all
    }
  }

  get number() {
    return Part.number(this.quantity)
  }

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

  static articlize(word) {
    return Articles.articlize(word)
  }

  static trim(string) {
    return (string || "").replace(/  +/g, " ")
  }

  static random(list) {
    return chance.pickone(list)
  }

  //converts cm into feet and inches as a string
  static toFt(cm) {
    const realFeet = cm * 0.3937 / 12
    const feet = Math.floor(realFeet)
    const inches = Math.round((realFeet - feet) * 12)
    return feet + "&prime;" + inches + "&Prime;"
  }

  //converts kg into lbs as a string
  static toLbs(kg) {
    return Math.round(kg * 2.20462) + " lbs"
  }

  static capitalize(words) {
    return words.charAt(0).toUpperCase() + words.slice(1)
  }
}
