import Grammar from "grammar/grammar"
import Saveable from "save/saveable"

export default class Part extends Saveable {
  constructor(owner) {
    super()
    this.owner = owner
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
      size: 0,
      sensitivity: 0.25
    })
  }

  get person() {
    return "third"
  }

  get gender() {
    return "none"
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
    return this.stored.size
  }

  set size(val) {
    this.stored.size = Math.round(val * 100) / 100
  }

  get quantity() {
    return this.stored.quantity
  }

  set quantity(val) {
    this.stored.quantity = Math.floor(val)
  }

  get sensitivity() {
    return this.stored.sensitivity
  }

  set sensitivity(val) {
    this.stored.sensitivity = val
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

  arouse(val = 0) {
    this.owner.arouse(val * this.sensitivity)
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
    return `${this.owner.their} ${Grammar.maybe(this.adjective)} ${
      this.pluralized
    }`
  }

  get all() {
    if (this.quantity === 1) {
      return this.your
    } else if (this.quantity === 2) {
      return `both of ${this.your}`
    } else {
      return `all ${Grammar.maybe(this.number)} of ${this.your}`
    }
  }

  get one() {
    if (this.quantity > 1) {
      return `one of your ${Grammar.maybe(this.number)} ${Grammar.maybe(
        this.adjective
      )} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  get two() {
    if (this.quantity > 2) {
      return `two of your ${Grammar.maybe(this.number)} ${Grammar.maybe(
        this.adjective
      )} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  get three() {
    if (this.quantity > 3) {
      return `three of your ${Grammar.maybe(this.number)} ${Grammar.maybe(
        this.adjective
      )} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  get four() {
    if (this.quantity > 4) {
      return `four of your ${Grammar.maybe(this.number)} ${Grammar.maybe(
        this.adjective
      )} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  get number() {
    return Grammar.number(this.quantity)
  }
}

Grammar.mix(Part)
