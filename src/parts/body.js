import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Body extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("body")

    this.addAdjective("shared", () => this.owner.perks.has("conjoined"))
  }

  get description() {
    return `${this.heightDescription} You weigh ${this.weight}.`
  }

  get heightDescription() {
    if (this.stored.size < 150) {
      return `You are self-conscious about your diminutive size of ${
        this.height
      }.`
    } else if (this.stored.size < 160) {
      return `You are not particularly tall at ${this.height} in height.`
    } else if (this.stored.size < 180) {
      return `You are an average ${this.height} tall.`
    } else if (this.stored.size < 200) {
      return `You are taller than most people at ${this.height}.`
    } else {
      return `People have to look up at your towering height of ${this.height}.`
    }
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1,
      size: 170, //in cm
      weight: 65, //in kg
    })
  }

  get height() {
    return Grammar.toFt(this.stored.size)
  }

  get weight() {
    return Grammar.toLbs(this.stored.weight)
  }

  // < 18 - underweight
  // > 25 - overweight
  // > 30 - obese
  // > 40 - morbidly obese
  get bmi() {
    return Math.round(
      (this.stored.weight / this.stored.size / this.stored.size) * 10000
    )
  }

  get humanReadableSize() {
    return Grammar.toFt(this.size)
  }
}
