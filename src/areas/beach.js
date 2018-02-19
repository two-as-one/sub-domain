import Area from "./_super"
import Chance from "chance"

const chance = new Chance()

export default class Beach extends Area {
  get saveKey() {
    return "area-beach"
  }

  get name() {
    return "beach"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      current: true,
      discovered: true
    })
  }

  get position() {
    return { x: 1, y: 0 }
  }

  get introMessage() {
    const player = this.game.player

    // prettier-ignore
    return `
      ${player.who} open your eyes — looking up to a cloudless blue sky, laying on the warm sand of an unknown beach.
      The peaceful sound of waves crashing against the shore reminding you of home.

      You're still alive … and somehow free.

      ${player.who} try to get up but ${player.body.your} hurts all over — maybe you'll just lay down for a little longer.`
  }

  get dayDescription() {
    return `
      The sun shines bright on the hot sand, but the cool ocean breeze keeps things bearable.`
  }

  get nightDescription() {
    return `
      A beautiful starry sky blankets over the ocean with the pale moon reflecting on the water and illuminating the shore.
      The temperature has dropped drastically.`
  }

  get campDescription() {
    return `
      You have made a ramshackle camp using debris from a sunken ship.`
  }

  get exploreMessage() {
    const player = this.game.player

    // prettier-ignore
    return chance.pickone([
      `The soft sand caresses ${player.feet.all} as ${player.who} explore the **beach**.`,
      `You/have a long walk along the **beach**.`
    ])
  }

  get sleepMessage() {
    const player = this.game.player

    return `
      You lay down on the cool sand.
      Gazing up to the sky, ${player.who} count the stars until you drift off.`
  }

  get sunsetMessage() {
    return `
      The day comes to its end as the **sun sets** below the horizon.`
  }

  get sunriseMessage() {
    const player = this.game.player

    return `
      ${player.who} wake up to the sound of crashing waves.
      The sun has already begun its ascend across the sky.`
  }

  explore() {
    const lvl = this.stored.lvl

    super.explore()

    //always discover forest first
    if (!this.game.world.forest.discovered) {
      return this.discoverForest()
      //guarantee finding a clam at lvl 1 - since the player will have just gone hungry, it teaches them they can find food by exploring
    } else if (lvl === 2) {
      return this.findClam()
    } else {
      return Area.weighted([
        { option: this.findClam, weight: 1 },
        { option: this.nothingHappened, weight: 0.5 },
        { option: this.findMilk, weight: 0.5 }
      ]).call(this)
    }
  }

  discoverForest() {
    this.game.world.forest.discover()

    return `
      There's a forest which seems to span all the way across the coast — at least as far as the eye can see.

      Maybe you could explore it too?

      You have discovered the **forest**!`
  }

  findClam() {
    const item = this.game.player.inventory.loot("clam")

    return `
      You find a peculiar looking clam laying on the beach.

      You pick it up, then head back to camp.

      **${item.name}** added to inventory.`
  }

  findMilk() {
    const item = this.game.player.inventory.loot("milk")

    return `
      You stumble upon a half-buried bottle in the sand.

      You pick it up, then head back to camp.

      **${item.name}** added to inventory.`
  }

  nothingHappened() {
    const xp = 5
    const player = this.game.player
    player.giveXP(xp)

    // prettier-ignore
    return `
      After a long and uneventful stroll along the coast, ${player.who} decide to head back to camp.

      You gain **${xp}xp**`
  }
}
