import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Feet extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1
    })
  }

  get singular() {
    return Grammar.random(["foot"])
  }

  get plural() {
    return Grammar.random(["feet"])
  }
}
