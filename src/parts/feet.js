import Part from "./_super"

export default class Feet extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("foot")

    // TODO - adjectives
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 1,
    })
  }

  get quantity() {
    return this.owner.legs.quantity
  }

  set quantity(val) {
    this.owner.legs.quantity = val
  }
}
