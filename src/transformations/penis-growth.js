import Grammar from "utils/grammar"
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
          ${Grammar.capitalize(
            this.owner.parts.penis.all
          )} throbs as it grows thicker and longer — <b>${Grammar.capitalize(
        this.owner.parts.penis.all
      )} has grown!</b>
        </p>`
    } else {
      return `
        <p>
          ${Grammar.capitalize(
            this.owner.parts.penis.all
          )} throb as they grow thicker and longer — <b>${Grammar.capitalize(
        this.owner.parts.penis.all
      )} have grown!</b>
        </p>`
    }
  }
}
