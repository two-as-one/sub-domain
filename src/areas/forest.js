import Area from "./_super"
import { persist } from "save/saveable"

export default class Forest extends Area {
  constructor(game) {
    super(game)

    persist(this, "area-forest")
  }

  get name() {
    return "forest"
  }

  get position() {
    return { x: 4, y: 0 }
  }

  get introMessage() {
    return `
      [you]/have a slow and arduous journey marked by the barely breathable air that is just as thick as the dense vegetation.
      Hardly any sunlight manages to make its way through the ominous canopy.
      Strange exotic sounds echo through the wilds, keeping you on your toes.

      After a couple of hours, you find a small opening in the vegetation with a hollow tree in the middle.
      Exhausted and needing a rest, [you] decide to set up camp here.`
  }

  get dayDescription() {
    return `
      The temperature is uncomfortably high while the air feels heavy and damp.
      A handful of sun rays pierce through the dense canopy, illuminating the darkness below.`
  }

  get nightDescription() {
    return `
      The familiar sounds of the forest have been replaced by those of crickets and owls.
      The pitch blackness occasionally pierced by the light of a firefly.`
  }

  get campDescription() {
    return `Your camp is set up on the inside of a massive hollow tree.`
  }

  get exploreMessage() {
    return `
      [you] cautiously creep through the dense foliage.
      Thick vines and branches constantly getting in your way and slowing you down.`
  }

  get sleepMessage() {
    return `
      [you] curl up on a bed of leaves and doze off to the sound of crickets and owls.`
  }

  get sunsetMessage() {
    return `
      Darkness falls over the forest as **night** takes over.`
  }

  get sunriseMessage() {
    return `
      [you] wake up from an uncomfortable night of sleep, due to the high temperature and humidity.
      A bright ray of sunshine pierces through the canopy and shines straight on [your.face].`
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
          weight: 1
        },
        { option: this.findMeatyMushroom, weight: 1 },
        { option: this.nothingHappened, weight: 0.5 }
      ]).call(this)
    }
  }

  findMeatyMushroom() {
    const item = this.game.player.inventory.loot("meaty-mushroom")

    return `
      You find an odd mushroom.
      It's long, meaty and starts throbbing as soon as you touch it.
      It kinda looks and feels like a cock.
      You pick it up, and bring it back to camp.

      **${item.name}** added to inventory.`
  }

  nothingHappened() {
    const player = this.game.player
    const xp = 5

    player.giveXP(xp)

    return `
      About an hour later [you] end up back at your camp.
      You had no idea you were going in a circle, but you've learned a little about this place.

      You gain **${xp}xp**`
  }
}
