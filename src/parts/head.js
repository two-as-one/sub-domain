import Part from "./_super"

export default class Head extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("head")
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 1,
    })
  }

  get quantity() {
    if (this.owner.perks && this.owner.perks.has("conjoined")) {
      return 2
    } else {
      return 1
    }
  }

  //no-op
  set quantity(val) {}
}
