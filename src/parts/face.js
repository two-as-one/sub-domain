import Grammar from "utils/grammar"
import Part from "./_super"

export default class Face extends Part {
  //face doesn't get saved, it's derived via other body parts
  get saveKey() {
    return null
  }

  get size() {
    return this.owner.parts.head.size
  }

  //no-op
  set size(val) {}

  get quantity() {
    return this.owner.parts.head.quantity
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
