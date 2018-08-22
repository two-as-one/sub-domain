import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Nipples extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1, //quantity per breast
      sensitivity: 0.75,
      size: 0.2 //in inches
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

  get growth() {
    return 0.2
  }

  get singular() {
    return ["nipple", "nip"]
  }

  get plural() {
    return ["nipples", "nips"]
  }

  get adjectives() {
    const adjectives = super.adjectives

    if (this.size < 0.4) {
      adjectives.push("small", "modest", "perky")
    } else if (this.size < 2) {
      adjectives.push("prominent", "noticeable", "sizeable")
    } else {
      adjectives.push("teat-like")
    }

    return adjectives
  }
}
