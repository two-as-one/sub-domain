import Grammar from "utils/grammar"
import Part from "./_super"

export default class Nipples extends Part {
  get saveKey() {
    return "player-part-feet"
  }

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

    if (this.stats.quantity === 0 || this.size === 0) {
      text += `<b>featureless and perfectly smooth</b>, lacking nipples.`
    } else {
      const a =
        this.stats.quantity === 1 ? "a" : Grammar.number(this.stats.quantity)
      text += `sporting <b>${a} ${this.adjective} ${this.size} inch ${
        this.pluralized
      }</b>.`
    }

    return text
  }

  get growth() {
    return 0.2
  }

  get singular() {
    return Grammar.random(["nipple", "nip"])
  }

  get plural() {
    return Grammar.random(["nipples", "nips"])
  }

  get adjective() {
    const list = []

    if (this.size < 0.4) {
      list.push("small", "modest", "perky")
    } else if (this.size < 2) {
      list.push("prominent", "noticeable", "sizeable")
    } else {
      list.push("teat-like")
    }

    return Grammar.random(list)
  }
}