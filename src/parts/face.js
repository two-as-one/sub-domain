import Part from "./_super"

export default class Face extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("face")

    // TODO - adjectives
  }

  get size() {
    return this.owner.head.size
  }

  //no-op
  set size(val) {}

  get quantity() {
    return this.owner.head.quantity
  }

  //no-op
  set quantity(val) {}
}
