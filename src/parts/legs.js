import Part from "./_super"

export default class Leg extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("leg")

    // TODO - adjectives
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1,
    })
  }
}
