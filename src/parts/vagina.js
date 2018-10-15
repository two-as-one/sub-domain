import Part from "./_super"

export default class Vagina extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("vagina")
    this.addSynonym("pussy")
    this.addSynonym("cunt")
    this.addSynonym("cunny")
    this.addSynonym("slit")
    this.addSynonym("vulva", "vulvae")

    this.addAdjective("firm", () => this.size < 1)
    this.addAdjective("tight", () => this.size < 1)
    this.addAdjective("used", () => this.between(1, 3))
    this.addAdjective("loose", () => this.between(1, 3))
    this.addAdjective("plump", () => this.between(1, 3))
    this.addAdjective("sloppy", () => this.between(1, 3))
    this.addAdjective("wide", () => this.size > 3)
    this.addAdjective("abused", () => this.size > 3)
    this.addAdjective("greedy", () => this.size > 3)
    this.addAdjective("gaping", () => this.size > 3)
    this.addAdjective("ravenous", () => this.size > 3)
    this.addAdjective("cavernous", () => this.size > 3)
    this.addAdjective("gluttonous", () => this.size > 3)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.8, //diameter of opening
      sensitivity: 0.75,
      quantity: 0,
    })
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.owner.penis.has) {
        text += `Further down you also have `
      } else {
        text += `You/have `
      }

      if (this.quantity === 1) {
        text += `**[a] ${this.adjective} ${this.name}**`
      } else {
        text += `**${this.number} ${this.adjective} ${this.name}**`
      }

      if (this.owner.penis.has) {
        text += `.`
      } else {
        text += ` between your legs.`
      }
    }

    return text
  }

  get seductionMessage() {
    return `
        You spread your legs lightly while facing [foe]. Placing [your:hands] on
        your inner thighs and sensually moving [them] upwards towards
        [your:adjective:vagina] but never quite reaching [them].`
  }

  get canSeduce() {
    return true
  }

  dilate(size) {
    if (this.size < size) {
      this.grow()

      return `**[your:adjective:vagina]~>have been stretched** and >be now looser.`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }
}
