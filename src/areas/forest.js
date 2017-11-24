import Area from "./_super"
import MinotaurEncounter from "encounters/minotaur"

export default class Forest extends Area {
  get saveKey() {
    return "area-forest"
  }

  get name() {
    return "forest"
  }

  get dayDescription() {
    return `
      <p>
        You are lost in the <b>forest</b>.
      </p>
      <p>
        The temperature is uncomfortably high while the air feels heavy and damp.
        A handful of sun rays pierce through the dense canopy, illuminating the darkness below.
        You have set up camp inside a massive hollow tree.
      </p>`
  }

  get nightDescription() {
    return `
      <p>
        Night has fallen over the <b>forest</b>.
      </p>
      <p>
        The familiar sounds of the forest have been replaced by those of crickets and owls.
        The pitch blackness occasionally pierced by the light of a firefly.
      </p>
    `
  }

  get exploreMessage() {
    return `
      <p>
        You cautiously creep through the dense foliage.
        Thick vines and branches constantly getting in your way and slowing you down.
      </p>`
  }

  get sleepMessage() {
    return `
    <p>
      You curl up on a bed of leaves and doze off to the sound of crickets and owls.
    </p>`
  }

  get sunsetMessage() {
    return `
    <p>
      Darkness falls over the forest as <b>night</b> takes over.
    </p>`
  }

  get sunriseMessage() {
    return `
      <p>
        You wake up from an uncomfortable night of sleep, due to the high temperature and humidity.
        A bright ray of sunshine piercing through the canopy and shining straight on your face.
      </p>`
  }

  explore() {
    const lvl = this.stats.lvl

    super.explore()

    if (lvl === 0) {
      return this.nothingHappened()
    } else if (lvl === 1) {
      return this.findMeatyMushroom()
    } else {
      return Area.weighted([
        { option: () => new MinotaurEncounter(this.game), weight: 1 },
        { option: this.findMeatyMushroom, weight: 1 },
        { option: this.nothingHappened, weight: 0.5 }
      ]).call(this)
    }
  }

  findMeatyMushroom() {
    const item = this.game.player.inventory.loot("meaty-mushroom")

    return `
      <p>
        You find an odd mushroom.
        It's long, meaty and starts throbbing as soon as you touch it.
        It kinda looks and feels like a cock.
        You pick it up, and bring it back to camp.
      </p>
      <p><b>${item.name}</b> added to inventory.</p>`
  }

  nothingHappened() {
    const xp = 5
    this.game.player.giveXP(xp)
    return `
      <p>
        About an hour later you end up back at your camp.
        You had no idea you were going in a circle, but you've learned a little about this place.
      </p>
      <p>You gain <b>${xp}xp</b></p>`
  }
}
