import Transformation from "./_super"

/**
 * Changes the number of breasts to 4 if the player has breasts
 */
export default class BreastsQuartet extends Transformation {
  get name() {
    return "grow four breasts"
  }

  get available() {
    return this.owner.breasts.has && this.owner.breasts.quantity !== 4
  }

  apply() {
    const breasts = this.owner.breasts

    breasts.quantity = 4
    breasts.arouse(10)

    return `
      Your chest feels tingly and hot. [you] look down and quickly realize why.

      **you now have [number:adjective:breasts(your)]**`
  }
}
