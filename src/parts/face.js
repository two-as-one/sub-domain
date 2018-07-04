import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Face extends Part {
  get size() {
    return this.owner.head.size
  }

  //no-op
  set size(val) {}

  get quantity() {
    return this.owner.head.quantity
  }

  //no-op
  set quantity(val) {}

  get singular() {
    return Grammar.random(["face"])
  }

  get plural() {
    return Grammar.random(["faces"])
  }

  get adjective() {
    return ""
  }
}
