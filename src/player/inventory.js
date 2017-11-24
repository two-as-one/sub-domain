import Item from "items/item"
import Saveable from "save/saveable"

export default class Inventory extends Saveable {
  constructor(player) {
    super()
    this.player = player

    this.equipWeapon(this.data.weapon)
    this.equipArmor(this.data.armor)
  }

  get saveKey() {
    return "player-inventory"
  }

  get savedAttribute() {
    return "data"
  }

  //extend this with any default values you want to be set on this class when it's restored
  get defaults() {
    return {
      bag: {
        rock: 0
      }
    }
  }

  get all() {
    return Object.keys(this.data.bag)
      .map(fileName => Item.create(fileName))
      .filter(item => item.quantity > 0)
      .sort()
  }

  //returns the number of items held
  quantity(fileName) {
    return this.data.bag[fileName] || 0
  }

  //finds an item with name
  find(fileName) {
    if (this.data.bag[fileName]) {
      return Item.create(fileName)
    }
  }

  //add an item to the inventory
  loot(fileName) {
    if (this.data.bag[fileName]) {
      this.data.bag[fileName] += 1
    } else {
      this.data.bag[fileName] = 1
    }

    return Item.create(fileName)
  }

  //remove an item from the inventory
  discard(fileName) {
    if (this.data.bag[fileName]) {
      this.data.bag[fileName] -= 1

      if (this.data.bag[fileName] === 0) {
        delete this.data.bag[fileName]
      }
    }
  }

  //equip a weapon by name
  //equips fists if no name given
  equipWeapon(name) {
    const weapon = name || "fists"
    this.equippedWeapon = Item.create(weapon)

    if (this.data.weapon && this.data.weapon !== "fists") {
      this.loot(this.data.weapon)
    }

    this.data.weapon = weapon
  }

  //equip armor by name
  //equips naked if no name given
  equipArmor(name) {
    const armor = name || "naked"
    this.equippedArmor = Item.create(armor)

    if (this.data.armor && this.data.armor !== "naked") {
      this.loot(this.data.armor)
    }

    this.data.armor = armor
  }
}
