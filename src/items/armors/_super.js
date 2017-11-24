import Item from "./../item"

export default class Armor extends Item {
  constructor() {
    super()
    this.isArmor = true
  }

  get equippedDescription() {
    return ""
  }

  //this deflection is applied to the damage formula
  //it's twice as effective as dexterity
  get deflection() {
    return 0
  }

  //this arousePower is applied to the arouse formula
  //it's as effective as the player's charisma
  //this can be a negative number if a particular piece of armor isn't very sexy at all
  get arousePower() {
    return 0
  }
}
