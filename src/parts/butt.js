import Part from "./_super"

export default class Butt extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("bum")
    this.addSynonym("ass")
    this.addSynonym("butt")
    this.addSynonym("behind")
    this.addSynonym("tush")
    this.addSynonym("bottom")
    this.addSynonym("derriere")

    this.addAdjective("boyish", () => this.size < 28)
    this.addAdjective("skinny", () => this.size < 28)
    this.addAdjective("wide", () => this.between(31, 37))
    this.addAdjective("girly", () => this.between(31, 37))
    this.addAdjective("ample", () => this.between(31, 37))
    this.addAdjective("curvy", () => this.between(31, 37))
    this.addAdjective("broad", () => this.between(31, 37))
    this.addAdjective("plump", () => this.between(31, 37))
    this.addAdjective("womanly", () => this.between(31, 37))
    this.addAdjective("generous", () => this.between(31, 37))
    this.addAdjective("fat", () => this.size > 37)
    this.addAdjective("huge", () => this.size > 37)
    this.addAdjective("curvaceous", () => this.size > 37)
    this.addAdjective("voluptuous", () => this.size > 37)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1,
    })
  }

  // in inches
  get size() {
    return this.owner.hips.size
  }

  // no-op
  set size(val) {}

  // no-op
  set quantity(val) {}
}
