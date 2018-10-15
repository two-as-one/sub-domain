import Part from "./_super"

export default class Arm extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("arm")

    // TODO - adjectives
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1,
    })
  }
}
