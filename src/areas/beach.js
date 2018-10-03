import Area from "./_super"
import Chance from "chance"
import { persist } from "save/saveable"

const chance = new Chance()

export default class Beach extends Area {
  constructor(game) {
    super(game)

    persist(this, "area-beach")
  }

  get name() {
    return "beach"
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

  get introMessage() {
    return `
      [you] open your eyes — looking up to a cloudless blue sky, laying on the warm sand of an unknown beach.
      Waking up to the peaceful sound of waves crashing against the shore.

      Where are you? Just how long did you sleep? More importantly — What the heck happened?

      [you] try to get up but [your:body] is sore and weak — maybe you'll just lay down for a little longer, coming to grips with your situation.`
  }

  get dayDescription() {
    return `
      The sun shines bright on the hot sand, but the cool ocean breeze keeps things bearable.`
  }

  get nightDescription() {
    return `
      A beautiful starry sky blankets the ocean. The pale moon reflecting on the water and illuminating the shore.
      The temperature has dropped drastically.`
  }

  get campDescription() {
    return `
      You have made a ramshackle camp using debris from what you assume is a sunken ship.`
  }

  get exploreMessage() {
    return chance.pickone([
      `The soft sand caresses [your:feet] as [you] explore the **beach**.`,
      `You/have a long walk along the **beach**.`,
    ])
  }

  get sleepMessage() {
    return `
      You lay down on the cool sand.
      Gazing up to the sky, [you] count the stars until you drift off.`
  }

  get sunsetMessage() {
    return `
      The day comes to its end as the **sun sets** below the horizon.`
  }

  get sunriseMessage() {
    return `
      [you] wake up to the sound of crashing waves.
      The sun has already begun its ascend across the sky.`
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

    return `
      Without straying too far from where you woke up, you explore this
      unfamiliar beach. Its shoreline extending both ways — far into the
      distance.

      You gaze over the azure sea with its cloudless blue sky draped above it.
      The temperature is quite nice. Even though the sun shines bright, there's
      a cool breeze coming from the ocean. You close your eyes for a while,
      letting the tranquillity flow through you.

      Behind you, there's a forest which seems to span all the way across the
      coast — at least as far as the eye can see. Maybe you could explore it
      too?

      You have discovered the **forest**!`
  }

  findClam() {
    this.game.scene.item = this.game.player.inventory.loot("clam")

    return `
      You find a peculiar looking clam laying on the beach.

      You pick it up, then head back to camp.

      **[item]** added to inventory.`
  }

  findMilk() {
    this.game.scene.item = this.game.player.inventory.loot("milk")

    return `
      You stumble upon a half-buried bottle in the sand.

      You pick it up, then head back to camp.

      **[item]** added to inventory.`
  }

  nothingHappened() {
    const xp = 5
    const player = this.game.player
    player.giveXP(xp)

    // prettier-ignore
    return `
      After a long and uneventful stroll along the coast, [you] decide to head back to camp.

      You gain **[xp]**`
  }
}
