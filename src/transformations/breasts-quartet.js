import Transformation from "./_super"

/**
 * Changes the number of breasts to 4 if the player has breasts
 */
export default class BreastsQuartet extends Transformation {
  get name() {
    return "grow four breasts"
  }

  get available() {
    return (
      this.owner.parts.breasts.has && this.owner.parts.breasts.quantity !== 4
    )
  }

  apply() {
    this.owner.parts.breasts.quantity = 4

    const text = `
      <p>
        Your chest feels tingly and hot.
        You look down and quickly realize why.
      </p>
      <p>
        <b>You now have ${this.owner.parts.breasts.number} ${
      this.owner.parts.breasts.adjective
    } ${this.owner.parts.breasts.pluralized}!</b>
      </p>`

    return text
  }
}
