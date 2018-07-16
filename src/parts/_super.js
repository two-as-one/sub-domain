import Grammar from "grammar/grammar"

export default class Part {
  constructor(owner, config = {}) {
    this.owner = owner

    this.stored = Object.assign({}, this.defaults, config)
  }

  // default values for this body part
  get defaults() {
    return {
      quantity: 0,
      size: 0,
      sensitivity: 0.25
    }
  }

  get name() {
    return `${this.owner.their} 50%${this.adjective} ${this.pluralized}`
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

  // determine whether this part is functional, perks or other conditions may affect whether a part is functional or not
  get functional() {
    return true
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

  // refers to specifically ALL of this part
  get all() {
    if (this.quantity === 1) {
      return this.name
    } else if (this.quantity === 2) {
      return `both of ${this.name}`
    } else {
      return `all 50%${this.number} of ${this.name}`
    }
  }

  // refers to specifically 1 of this part (or the closest available quantity)
  get one() {
    if (this.quantity > 1) {
      return `
        one of your 50%${this.number} 50%${this.adjective} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  // refers to specifically 2 of this part (or the closest available quantity)
  get two() {
    if (this.quantity > 2) {
      return `
        two of your 50%${this.number} 50%${this.adjective} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  // refers to specifically 3 of this part (or the closest available quantity)
  get three() {
    if (this.quantity > 3) {
      return `
        three of your 50%${this.number} 50%${this.adjective} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  // refers to specifically 4 of this part (or the closest available quantity)
  get four() {
    if (this.quantity > 4) {
      return `
        four of your 50%${this.number} 50%${this.adjective} ${this.pluralized}`
    } else {
      return this.all
    }
  }

  get number() {
    return Grammar.number(this.quantity)
  }
}

Grammar.mix(Part)
