import Transformation from "./_super"

/**
 * Increases penis size if the player has one
 */
export default class PenisGrowth extends Transformation {
  get name() {
    return "increase penis size"
  }

  get available() {
    return this.owner.penis.has
  }

  apply() {
    const penis = this.owner.penis

    penis.grow()
    penis.arouse(10)

    return `
      ${penis.all}~>throb as ${penis.they}~>grow thicker and longer —
      **${penis.all}~>have grown!**`
  }
}
