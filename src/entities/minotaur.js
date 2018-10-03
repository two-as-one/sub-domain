import Entity from "./_super"
import { Anus, Vagina, Breasts, Mouth, Penis } from "parts/_all"

export default class Minotaur extends Entity {
  constructor() {
    super({
      lvl: 3,
    })

    this.title = "minotaur"
    this.gender = "none" /* it/its/itself */

    this.giveRandomStats(this.stored.lvl * 2, ["str", "stam"])

    this.loot = "minotaur-spunk"

    this.penis.size = 16
    this.penis.quantity = 1
    this.penis.type = "bovine"
    this.balls.quantity = 2
  }

  likes(part) {
    if (part instanceof Anus || part instanceof Vagina) {
      return 1
    }

    if (part instanceof Breasts || part instanceof Mouth) {
      return 0.75
    }

    if (part instanceof Penis) {
      return 0.25
    }

    return 0.5
  }

  infect(player) {
    return player.transform.pickOne(["minotaur cum"], 0.9)
  }
}
