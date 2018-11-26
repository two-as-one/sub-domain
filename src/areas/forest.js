import Area from "./_super"
import { persist } from "save/saveable"
import { lib, combine } from "library/library"

export default class Forest extends Area {
  constructor(game) {
    super(game)

    persist(this, "area-forest")
  }

  get name() {
    return "the forest"
  }

  get prefix() {
    return "FOREST"
  }

  get position() {
    return { x: 4, y: 0 }
  }

  explore() {
    const lvl = this.stored.lvl

    super.explore()

    if (lvl === 1) {
      return this.nothingHappened()
    } else if (lvl === 2) {
      return this.findMeatyMushroom()
    } else {
      return Area.weighted([
        {
          option: () => this.game.setScene("encounter", "minotaur"),
          weight: 1,
        },
        { option: this.findMeatyMushroom, weight: 1 },
        { option: this.nothingHappened, weight: 0.5 },
      ]).call(this)
    }
  }

  findMeatyMushroom() {
    this.game.scene.item = this.game.player.inventory.loot("meaty-mushroom")

    return combine(lib("FOREST_FIND_MEATY_MUSHROOM"), lib("ITEM_PICKUP"))
  }

  nothingHappened() {
    const player = this.game.player
    const xp = 5

    player.giveXP(xp)

    return combine(lib("FOREST_NOTHING_HAPPENED"), lib("XP_GAIN"))
  }
}
