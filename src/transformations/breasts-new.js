import Transformation from "./_super"

/**
 * Grow a new pair of breasts if the player has none
 */
export default class BreastsNew extends Transformation {
  get name() {
    return "grow a pair of breasts"
  }

  get available() {
    return !this.owner.breasts.has
  }

  apply() {
    const breasts = this.owner.breasts

    breasts.quantity = 2
    breasts.size = 1
    breasts.arouse(10)

    return `
      Your chest feels tingly and hot. [you] look down and quickly realize why.

      Your chest has swollen and **you now have
      [number:adjective:breasts(your)]!**`
  }
}
