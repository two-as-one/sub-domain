import Transformation from "./_super"

/**
 * Increases nipple size if the player has nipples
 */
export default class NippleGrowth extends Transformation {
  get name() {
    return "increase nipple size"
  }

  get available() {
    return (
      this.owner.nipples.has &&
      this.owner.nipples.size < this.owner.breasts.size / 10
    )
  }

  apply() {
    this.owner.nipples.grow()
    this.owner.nipples.arouse(10)

    return `
      Your chest feels tingly and hot.
      ${this.owner.who} look down and quickly realize why.

      **Your nipples have swollen and permanently grown longer and thicker!**`
  }
}
