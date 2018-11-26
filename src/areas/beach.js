import Area from "./_super"
import { persist } from "save/saveable"
import { lib, combine } from "library/library"

export default class Beach extends Area {
  constructor(game) {
    super(game)

    persist(this, "area-beach")
  }

  get name() {
    return "the beach"
  }

  get prefix() {
    return "BEACH"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      current: true,
      discovered: true,
    })
  }

  get position() {
    return { x: 1, y: 0 }
  }

  explore() {
    const lvl = this.stored.lvl

    super.explore()

    //always discover forest first
    if (!this.game.world.forest.discovered) {
      // discover the forest first
      return this.discoverForest()
    } else if (lvl === 2) {
      // guarantee finding a clam after that - teaches the player about consumables
      return this.findClam()
    } else {
      return Area.weighted([
        { option: this.findClam, weight: 1 },
        { option: this.nothingHappened, weight: 0.5 },
        { option: this.findMilk, weight: 0.5 },
      ]).call(this)
    }
  }

  discoverForest() {
    this.game.world.forest.discover()
    return lib("BEACH_DISCOVER_FOREST")
  }

  findClam() {
    this.game.scene.item = this.game.player.inventory.loot("clam")

    return combine(lib("BEACH_FIND_CLAM"), lib("ITEM_PICKUP"))
  }

  findMilk() {
    this.game.scene.item = this.game.player.inventory.loot("milk")

    return combine(lib("BEACH_FIND_MILK"), lib("ITEM_PICKUP"))
  }

  nothingHappened() {
    const xp = 5
    const player = this.game.player
    player.giveXP(xp)

    return combine(lib("BEACH_NOTHING_HAPPENED"), lib("XP_GAIN"))
  }
}
