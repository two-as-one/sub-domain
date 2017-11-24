import Part from "parts/_super"
import Transformation from "./_super"

/**
 * Increases penis size if the player has one
 */
export default class PenisGrowth extends Transformation {
  get name() {
    return "increase penis size"
  }

  get available() {
    return this.owner.parts.penis.has
  }

  apply() {
    this.owner.parts.penis.grow()

    if (this.owner.parts.penis.quantity === 1) {
      return `
        <p>
          ${Part.capitalize(
            this.owner.parts.penis.all
          )} starts throbbing and quickly grows erect, but it doesn't stop there — it grows way past its normal size!
        </p>
        <p>
          <b>${Part.capitalize(this.owner.parts.penis.all)} has grown!</b>
        </p>`
    } else {
      return `
        <p>
          ${Part.capitalize(
            this.owner.parts.penis.all
          )} start throbbing and quickly grow erect, but they don't stop there — they keep growing way past their normal size!
        </p>
        <p>
          <b>${Part.capitalize(this.owner.parts.penis.all)} have grown!</b>
        </p>`
    }
  }
}
