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

    const you = this.owner.who

    return `
      <p>
        Your groin feels hot and itchy — as you reach down to scratch, ${you} notice something unusual.
      </p>
      <p>
        <b>You have grown a tiny new ${this.owner.penis.singular}!</b>
      </p>`
  }
}
