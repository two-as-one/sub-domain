import Area from "./_super"
import Grammar from "utils/grammar"

export default class Forest extends Area {
  get saveKey() {
    return "area-forest"
  }

  get name() {
    return "forest"
  }

  get introMessage() {
    const you = this.game.player.who

    return `<p>
      ${Grammar.capitalize(
        you
      )} have a slow and arduous journey marked by the barely breathable air that is just as thick as the dense vegetation.
      Hardly any sunlight manages to make its way through the ominous canopy.
      Strange exotic sounds echo through the wilds, keeping you on your toes.
    </p>
    <p>
      After a couple of hours, you find a small opening in the vegetation with a hollow tree in the middle.
      Exhausted and needing a rest, ${you} decide to set up camp here.
    </p>`
  }

  get dayDescription() {
    return `
      <p>
        The temperature is uncomfortably high while the air feels heavy and damp.
        A handful of sun rays pierce through the dense canopy, illuminating the darkness below.
      </p>`
  }

  get nightDescription() {
    return `
      <p>
        The familiar sounds of the forest have been replaced by those of crickets and owls.
        The pitch blackness occasionally pierced by the light of a firefly.
      </p>
    `
  }

  get campDescription() {
    return `<p>You have set up camp inside a massive hollow tree.</p>`
  }

  get exploreMessage() {
    const you = this.game.player.who
    return `
      <p>
        ${Grammar.capitalize(you)} cautiously creep through the dense foliage.
        Thick vines and branches constantly getting in your way and slowing you down.
      </p>`
  }

  get sleepMessage() {
    const you = this.game.player.who
    return `
    <p>
      ${Grammar.capitalize(
        you
      )} curl up on a bed of leaves and doze off to the sound of crickets and owls.
    </p>`
  }

  get sunsetMessage() {
    return `
    <p>
      Darkness falls over the forest as <b>night</b> takes over.
    </p>`
  }

  get sunriseMessage() {
    const you = this.game.player.who
    const your_face = this.game.player.parts.face.all

    return `
      <p>
        ${Grammar.capitalize(
          you
        )} wake up from an uncomfortable night of sleep, due to the high temperature and humidity.
        A bright ray of sunshine pierces through the canopy and shines straight on ${your_face}.
      </p>`
  }

  explore() {
    const lvl = this.stats.lvl

    super.explore()

    if (lvl === 1) {
      return this.nothingHappened()
    } else if (lvl === 2) {
      return this.findMeatyMushroom()
    } else {
      return Area.weighted([
        {
          option: () => this.game.switchState("encounter", "minotaur"),
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

    const you = this.game.player.who
    return `
      <p>
        About an hour later ${you} end up back at your camp.
        You had no idea you were going in a circle, but you've learned a little about this place.
      </p>
      <p>You gain <b>${xp}xp</b></p>`
  }
}
