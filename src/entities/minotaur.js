import Entity from "./_super"

export default class Minotaur extends Entity {
  constructor() {
    super({
      lvl: 3
    })

    this.title = "minotaur"
    this.gender = "none" /* it/its/itself */

    this.giveRandomStats(this.stored.lvl * 2, ["str", "stam"])

    this.loot = "minotaur-spunk"

    this.penis.size = 16
    this.penis.quantity = 2
    this.penis.type = 'bovine'
    this.balls.quantity = 2
  }

  likes(part) {
    switch (part) {
      case "anus":
      case "vagina":
        return 1
      case "breasts":
      case "mouth":
        return 0.75
      case "penis":
        return 0.25
      default:
        return 0.5
    }
  }

  infect(player) {
    return player.transform.pickOne(["minotaur cum"], 0.9)
  }
}
