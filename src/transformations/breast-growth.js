import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Increases breast size if the player has breasts
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "increase breast size"
  }

  get available() {
    return this.owner.breasts.has
  }

  apply() {
    this.owner.breasts.grow()

    const you = this.owner.who

    const text = `
      <p>
        Your chest feels tingly and hot.
        ${Grammar.capitalize(you)} look down and quickly realize why.
      </p>
      <p>
        <b>${Grammar.capitalize(this.owner.breasts.all)} have grown!</b>
      </p>`

    return text
  }
}
