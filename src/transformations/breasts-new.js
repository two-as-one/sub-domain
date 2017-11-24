import Transformation from "./_super"

/**
 * Grow a new pair of breasts if the player has none
 */
export default class BreastsNew extends Transformation {
  get name() {
    return "grow a pair of breasts"
  }

  get available() {
    return !this.owner.parts.breasts.has
  }

  apply() {
    this.owner.parts.breasts.quantity = 2
    this.owner.parts.breasts.size = 1

    const text = `
      <p>
        Your chest feels tingly and hot.
        You look down and quickly realize why.
      </p>
      <p>
        Your chest has swollen and <b>you now have ${
          this.owner.parts.breasts.number
        } ${this.owner.parts.breasts.adjective} ${
      this.owner.parts.breasts.pluralized
    }!</b>
      </p>`

    return text
  }
}
