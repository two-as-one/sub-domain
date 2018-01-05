import Grammar from "utils/grammar"
import Part from "./_super"

export default class Hands extends Part {
  get saveKey() {
    return "player-part-hands"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1
    })
  }

  get singular() {
    return Grammar.random(["hand"])
  }

  get plural() {
    return Grammar.random(["hands"])
  }

  get adjective() {
    return ""
  }
}
