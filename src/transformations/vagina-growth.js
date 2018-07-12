import Transformation from "./_super"

/**
 * Increases vagina size if the player has one
 */
export default class VaginaGrowth extends Transformation {
  get name() {
    return "increase vagina size"
  }

  get available() {
    return this.owner.vagina.has
  }

  apply() {
    const vagina = this.owner.vagina
    vagina.grow()
    vagina.arouse(10)

    return `
        ${this.owner.who} feel a warmth radiating from your nether regions —
        followed by a trickle down your inner thighs. You grow hot and horny and
        reach down between your legs to find out why.

        **${vagina.all}~>have grown plumper!**`
  }
}
