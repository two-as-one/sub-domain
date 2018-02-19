import Item from "items/item"
import Saveable from "save/saveable"

export default class Inventory extends Saveable {
  constructor(player) {
    super()
    this.player = player

    this.equipWeapon(this.stored.weapon)
    this.equipArmor(this.stored.armor)
  }

  get saveKey() {
    return "player-inventory"
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
    return Object.keys(this.stored.bag)
      .filter(key => Number(this.stored.bag[key]) > 0)
      .map(fileName => Item.create(fileName))
      .sort()
  }

  //returns the number of items held
  quantity(fileName) {
    return this.stored.bag[fileName] || 0
  }

  //finds an item with name
  find(fileName) {
    if (this.stored.bag[fileName]) {
      return Item.create(fileName)
    }
  }

  //add an item to the inventory
  loot(fileName) {
    if (this.stored.bag[fileName]) {
      this.stored.bag[fileName] += 1
    } else {
      this.stored.bag[fileName] = 1
    }

    return Item.create(fileName)
  }

  //remove an item from the inventory
  discard(fileName) {
    if (this.stored.bag[fileName]) {
      this.stored.bag[fileName] -= 1

      if (this.stored.bag[fileName] === 0) {
        delete this.stored.bag[fileName]
      }
    }
  }

  //equip a weapon by name
  //equips fists if no name given
  equipWeapon(name) {
    const weapon = name || "fists"
    this.equippedWeapon = Item.create(weapon)

    if (this.stored.weapon && this.stored.weapon !== "fists") {
      this.loot(this.stored.weapon)
    }

    this.stored.weapon = weapon
  }

  //equip armor by name
  //equips naked if no name given
  equipArmor(name) {
    const armor = name || "naked"
    this.equippedArmor = Item.create(armor)

    if (this.stored.armor && this.stored.armor !== "naked") {
      this.loot(this.stored.armor)
    }

    this.stored.armor = armor
  }
}
