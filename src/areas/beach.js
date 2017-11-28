import Area from "./_super"

export default class Beach extends Area {
  get saveKey() {
    return "area-beach"
  }

  get name() {
    return "beach"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      lvl: 0,
      current: true,
      discovered: true
    })
  }

  get dayDescription() {
    return `
      <p>You are stranded on the <b>beach</b>.</p>
      <p>The sun shines bright on the hot sand while a cool breeze from the ocean keeps things bearable.</p>
      <p>You have made a ramshackle camp using debris from a sunken ship.</p>`
  }

  get nightDescription() {
    return `
      <p>Night has fallen on the <b>beach</b>.</p>
      <p>A beautiful starry sky blankets over the ocean with the pale moon reflecting on the water and illuminating the shore. The temperature has dropped drastically.</p>
    `
  }

  get exploreMessage() {
    return `
      <p>The soft sand caresses ${
        this.game.player.parts.feet.all
      } as you explore the <b>beach</b>.</p>`
  }

  get sleepMessage() {
    return `
      <p>You lay down on the cool sand. Gazing up to the sky, you count the stars until you drift off.</p>
    `
  }

  get sunsetMessage() {
    return `
      <p>The day comes to its end as the <b>sun sets</b> below the horizon.</p>
    `
  }

  get sunriseMessage() {
    return `
      <p>You wake up to the sound of crashing waves. The sun has already begun its ascend across the sky.</p>
    `
  }

  explore() {
    const lvl = this.stats.lvl

    super.explore()

    //always discover forest first
    if (!this.game.world.forest.discovered) {
      return this.discoverForest()
      //guarantee finding a clam at lvl 1 - since the player will have just gone hungry, it teaches them they can find food by exploring
    } else if (lvl === 1) {
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
    this.game.forest.discover()

    return `
      <p>There's a forest which seems to span all the way across the coast — at least as far as the eye can see.</p>
      <p>Maybe you could explore it too?</p>
      <p>You have discovered the <b>forest</b>!</p>
    `
  }

  findClam() {
    const item = this.game.player.inventory.loot("clam")

    return `
      <p>You find a peculiar looking clam laying on the beach.</p>
      <p>You pick it up, then head back to camp.</p>
      <p><b>${item.name}</b> added to inventory.</p>`
  }

  findMilk() {
    const item = this.game.player.inventory.loot("milk")

    return `
      <p>You stumble upon a half-buried bottle in the sand.</p>
      <p>You pick it up, then head back to camp.</p>
      <p><b>${item.name}</b> added to inventory.</p>`
  }

  nothingHappened() {
    const xp = 5
    this.game.player.giveXP(xp)
    return `
      <p>After a long and uneventful stroll along the coast, you decide to head back to camp.</p>
      <p>You gain <b>${xp}xp</b></p>`
  }
}
