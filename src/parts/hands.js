import Part from "./_super"

export default class Hands extends Part {
  get saveKey() {
    return "player-part-hands"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2
    })
  }

  get singular() {
    return Part.random(["hand"])
  }

  get plural() {
    return Part.random(["hands"])
  }

  get adjective() {
    return ""
  }
}
