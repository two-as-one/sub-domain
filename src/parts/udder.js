import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Udder extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("udder")

    this.addAdjective("small", () => this.size < 4)
    this.addAdjective("perky", () => this.size < 4)
    this.addAdjective("little", () => this.size < 4)
    this.addAdjective("modest", () => this.between(4, 8))
    this.addAdjective("sizable", () => this.between(4, 8))
    this.addAdjective("hefty", () => this.between(8, 12))
    this.addAdjective("heavy", () => this.between(8, 12))
    this.addAdjective("large", () => this.between(8, 12))
    this.addAdjective("massive", () => this.size > 12)
    this.addAdjective("enormous", () => this.size > 12)
    this.addAdjective("imposing", () => this.size > 12)
    this.addAdjective("humongous", () => this.size > 12)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
      size: 0,
      sensitivity: 0.5,
      teats: 4,
    })
  }

  get teats() {
    return this.stored.teats
  }

  set teats(number) {
    this.stored.teats = number
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.size < 4) {
        text += `nestled below your belly button `
      } else {
        text += `attached below your belly button but hanging between your legs `
      }

      if (this.quantity === 1) {
        text += `you/have **[a] ${this.adjective} ${this.name}**`
      } else {
        text += `
          you/have **${this.number} ${this.adjective} ${this.name}**`
      }

      text += ` with **${Grammar.number(this.teats)} teats**`

      if (this.quantity > 1) {
        text += ` each`
      }

      if (this.size >= 8) {
        if (this.quantity === 1) {
          text += ` — it bounces around against your inner thighs as you walk`
        } else {
          text += ` — they bounce around against your inner thighs as you walk`
        }
      }
    }

    return text
  }
}
