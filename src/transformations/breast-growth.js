import Part from "parts/_super"
import Transformation from "./_super"

/**
 * Increases breast size if the player has breasts
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "increase breast size"
  }

  get available() {
    return this.owner.parts.breasts.has
  }

  apply() {
    this.owner.parts.breasts.grow()

    const text = `
      <p>
        Your chest feels tingly and hot.
        You look down and quickly realize why.
      </p>
      <p>
        <b>${Part.capitalize(this.owner.parts.breasts.all)} have grown!</b>
      </p>`

    return text
  }
}
