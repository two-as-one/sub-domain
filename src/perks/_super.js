export default class Perk {
  constructor(player) {
    this.player = player
  }

  //perk name - this must be unique among perks as it's also used as an identifier
  get name() {
    return ""
  }

  //return true if the player can pick this perk
  get available() {
    return false
  }

  //flavor text
  get description() {
    return ""
  }

  //describe effect
  get effect() {
    return ""
  }
}
