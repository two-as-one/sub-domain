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
      Your chest feels tingly and hot. [you] look down and quickly realize why.

      **[your.breasts]~>have grown!**`
  }
}
