import Part from "./_super"

export default class Hips extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("hip")

    this.addAdjective("thin", () => this.size < 28)
    this.addAdjective("boyish", () => this.size < 28)
    this.addAdjective("skinny", () => this.size < 28)
    this.addAdjective("narrow", () => this.size < 28)
    this.addAdjective("slender", () => this.size < 28)
    this.addAdjective("wide", () => this.between(31, 37))
    this.addAdjective("girly", () => this.between(31, 37))
    this.addAdjective("ample", () => this.between(31, 37))
    this.addAdjective("curvy", () => this.between(31, 37))
    this.addAdjective("broad", () => this.between(31, 37))
    this.addAdjective("plump", () => this.between(31, 37))
    this.addAdjective("womanly", () => this.between(31, 37))
    this.addAdjective("generous", () => this.between(31, 37))
    this.addAdjective("fat", () => this.size > 37)
    this.addAdjective("curvaceous", () => this.size > 37)
    this.addAdjective("voluptuous", () => this.size > 37)
    this.addAdjective("child-bearing", () => this.size > 37)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
    })
  }

  // in inches
  get size() {
    const bmiMin = 12
    const bmiMax = 42
    const waistMin = 23
    const waistMax = 50
    const bmi = this.owner.body.bmi

    return (
      ((waistMax - waistMin) * (bmi - bmiMin)) / (bmiMax - bmiMin) + waistMin
    )
  }

  // no-op
  set size(val) {}

  // no-op
  set quantity(val) {}

  get hipSize() {
    if (this.size < 25) {
      return "XS"
    } else if (this.size < 28) {
      return "S"
    } else if (this.size < 31) {
      return "M"
    } else if (this.size < 34) {
      return "L"
    } else if (this.size < 37) {
      return "XL"
    } else if (this.size < 40) {
      return "XXL"
    } else if (this.size < 43) {
      return "XXXL"
    } else if (this.size < 46) {
      return "4XL"
    } else if (this.size < 49) {
      return "5XL"
    } else {
      return ""
    }
  }
}
