import Transformation from "./_super"

/**
 * Grows a new penis if the player has none
 */
export default class PenisNew extends Transformation {
  get name() {
    return "grow a new penis"
  }

  get available() {
    return !this.owner.penis.has
  }

  apply() {
    this.owner.penis.quantity = 1
    this.owner.penis.size = 2
    this.owner.penis.arouse(10)

    return `
      Your groin feels hot and itchy — as you reach down to scratch, ${
        this.owner.who
      } notice something unusual.

      **You have grown a tiny new ${this.owner.penis.singular}!**`
  }
}
