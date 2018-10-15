import Part from "./_super"

export default class Hands extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("hand")

    // TODO - adjectives
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 1,
    })
  }

  get quantity() {
    return this.owner.arms.quantity
  }

  set quantity(val) {
    this.owner.arms.quantity = val
  }
}
