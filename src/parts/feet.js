import Part from "./_super"

export default class Feet extends Part {
  get saveKey() {
    return "player-part-feet"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1
    })
  }

  get singular() {
    return Part.random(["foot"])
  }

  get plural() {
    return Part.random(["feet"])
  }

  get adjective() {
    return ""
  }
}
