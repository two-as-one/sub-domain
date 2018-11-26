import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Nipples extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("nip", null, () => this.size <= 2)
    this.addSynonym("nipple", null, () => this.size <= 2)
    this.addSynonym("teat", null, () => this.size > 2)

    this.addAdjective("small", () => this.size < 0.4)
    this.addAdjective("perky", () => this.size < 0.4)
    this.addAdjective("modest", () => this.size < 0.4)
    this.addAdjective("sizeable", () => this.between(0.4, 2))
    this.addAdjective("prominent", () => this.between(0.4, 2))
    this.addAdjective("noticeable", () => this.between(0.4, 2))
    this.addAdjective("teat-like", () => this.between(1.5, 2))
    this.addAdjective("fleshy", () => this.size > 2)
    this.addAdjective("long", () => this.size > 2)
    this.addAdjective("elongated", () => this.size > 2)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1, //quantity per breast
      sensitivity: 0.75,
      size: 0.2, //in inches
    })
  }

  //description per breast
  get description() {
    let text = ""

    if (this.stored.quantity === 0 || this.size === 0) {
      text += `**featureless and perfectly smooth**, lacking nipples.`
    } else {
      const a =
        this.stored.quantity === 1 ? "a" : Grammar.number(this.stored.quantity)
      text += `
        sporting **${a} ${this.adjective} ${this.size} inch ${this.name}**.`
    }

    return text
  }

  get quantity() {
    return this.stored.quantity * this.owner.breasts.quantity
  }

  get growth() {
    return 0.2
  }

  get humanReadableSize() {
    return Grammar.toFt(this.size)
  }
}
