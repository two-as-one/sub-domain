import Transformation from "./_super"

/**
 * Grows a extra nipple if the player already has some - up to 4
 */
export default class NippleExtra extends Transformation {
  get name() {
    return "grow an extra nipple"
  }

  get available() {
    return this.owner.nipples.has && this.owner.nipples.quantity < 4
  }

  apply() {
    this.owner.nipples.add()
    this.owner.nipples.arouse(10)

    return `
      Your chest feels tingly and hot. [you] look down and quickly realize why.

      **[each of:your:breasts]~>have grown an additional nipple!**`
  }
}
