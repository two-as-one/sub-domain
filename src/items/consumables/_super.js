import Item from "./../item"

export default class Consumable extends Item {
  constructor() {
    super()
    this.isConsumable = true
  }

  //extend this with what the item does
  //must return a string that describes what happened
  consume(player) {
    return ""
  }

  get description() {
    return ""
  }
}
