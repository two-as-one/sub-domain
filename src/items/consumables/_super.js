import Item from "./../item"

export default class Consumable extends Item {
  constructor() {
    super()
    this.isConsumable = true
  }

  //determine how much hunger this item restores
  get hunger() {
    return 8
  }

  //extend this with what the item does
  //must return a string that describes what happened
  consume(player) {
    player.eat(this.hunger)

    return ""
  }
}
