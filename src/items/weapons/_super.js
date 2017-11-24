import Item from "./../item"

export default class Weapon extends Item {
  constructor() {
    super()
    this.isWeapon = true
  }

  get equippedDescription() {
    return ""
  }

  get attackPower() {
    return 0
  }
}
