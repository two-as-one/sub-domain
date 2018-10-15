import Grammar from "grammar/grammar"

/**
 * describe a synonym for this part
 * synonyms can have conditions preventing them from being picked
 */
class Synonym {
  constructor(singular = "", plural = "", condition = false) {
    this.condition = condition
    this.singular = singular
    this.plural = plural || Grammar.pluralize(singular)
  }

  get available() {
    return this.condition ? this.condition() : true
  }
}

/**
 * describe an adjective
 * describe can have conditions preventing them from being picked
 */
class Adjective {
  constructor(word = "", condition = false) {
    this.condition = condition
    this.word = word
  }

  get available() {
    return this.condition ? this.condition() : true
  }
}

export default class Part {
  constructor(owner, config = {}) {
    this.owner = owner

    this.synonyms = []
    this.adjectives = []

    this.stored = Object.assign({}, this.defaults, config)
  }

  // default values for this body part
  get defaults() {
    return {
      quantity: 0,
      size: 0,
      sensitivity: 0.25,
      type: "human",
    }
  }

  addSynonym(singular, plural, condition) {
    this.synonyms.push(new Synonym(singular, plural, condition))
  }

  addAdjective(word, condition) {
    this.adjectives.push(new Adjective(word, condition))
  }

  get name() {
    return this.multiple ? this.plural : this.singular
  }

  get singular() {
    const word = Grammar.random(this.synonyms.filter(word => word.available))
    return word.singular
  }

  get plural() {
    const word = Grammar.random(this.synonyms.filter(word => word.available))
    return word.plural
  }

  get adjective() {
    const adjectives = this.adjectives
      .filter(adjective => adjective.available)
      .map(adjective => adjective.word)

    // adds type to adjectives if its noteworthy
    if (this.type !== "human") {
      adjectives.push(this.type)
    }

    if (!adjectives.length) {
      return ""
    }

    return Grammar.random(adjectives) || ""
  }

  get person() {
    return "third"
  }

  get gender() {
    return "none"
  }

  // only return a description if the player has this part
  get description() {
    return ""
  }

  // define a message for when the player attempts to seduce using this part
  get seductionMessage() {
    return ""
  }

  // return true if the player can seduce with this part
  get canSeduce() {
    return false
  }

  get size() {
    return this.stored.size
  }

  set size(val) {
    this.stored.size = Math.round(val * 100) / 100
  }

  // extend this with some part-specific formula to determine diameter
  get diameter() {
    return 0
  }

  get type() {
    return this.stored.type
  }

  set type(val) {
    this.stored.type = val
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

  // check whether this part's size is between a minimum and (including) a maximum
  between(min, max) {
    return this.size > Number(min) && this.size <= Number(max)
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

  // determine by how much this part grows or shrinks
  get growth() {
    return 1
  }

  // refers to specifically ALL of this part
  get all() {
    if (this.quantity === 1) {
      return ""
    } else if (this.quantity === 2) {
      return "both of"
    } else {
      return `all ${this.number} of`
    }
  }

  // refers to specifically 1 of this part (or the closest available quantity)
  get one() {
    if (this.quantity > 1) {
      return "one of"
    } else {
      return this.all
    }
  }

  // refers to specifically 2 of this part (or the closest available quantity)
  get two() {
    if (this.quantity > 2) {
      return "two of"
    } else {
      return this.all
    }
  }

  // refers to specifically 3 of this part (or the closest available quantity)
  get three() {
    if (this.quantity > 3) {
      return "three of"
    } else {
      return this.all
    }
  }

  // refers to specifically 4 of this part (or the closest available quantity)
  get four() {
    if (this.quantity > 4) {
      return "four of"
    } else {
      return this.all
    }
  }

  get number() {
    return Grammar.number(this.quantity)
  }

  get that() {
    return this.quantity === 1 ? "that" : "those"
  }
}

Grammar.mix(Part)
