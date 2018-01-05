import Transformation from "./_super"

/**
 * Grows a new penis if the player has none
 */
export default class PenisNew extends Transformation {
  get name() {
    return "grow a new penis"
  }

  get available() {
    return !this.owner.parts.penis.has
  }

  apply() {
    this.owner.parts.penis.add()

    const you = this.owner.who

    return `
      <p>
        Your groin feels hot and itchy — as you reach down to scratch, ${you} notice something unusual.
      </p>
      <p>
        <b>You have grown a tiny new ${this.owner.parts.penis.singular}!</b>
      </p>`
  }
}
