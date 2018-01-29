import Transformation from "./_super"

/**
 * Increases breast size if the player has breasts
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "increase breast size"
  }

  get available() {
    return this.owner.breasts.has
  }

  apply() {
    this.owner.breasts.grow()
    this.owner.breasts.arouse(10)

    return `
      Your chest feels tingly and hot.
      ${this.owner.who} look down and quickly realize why.

      **${this.owner.breasts.all} have grown!**`
  }
}
