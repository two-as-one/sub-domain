import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Grow a new pair of breasts if the player has none
 */
export default class BreastsNew extends Transformation {
  get name() {
    return "grow a pair of breasts"
  }

  get available() {
    return !this.owner.breasts.has
  }

  apply() {
    this.owner.breasts.quantity = 2
    this.owner.breasts.size = 1

    const you = this.owner.who

    const text = `
      <p>
        Your chest feels tingly and hot.
        ${Grammar.capitalize(you)} look down and quickly realize why.
      </p>
      <p>
        Your chest has swollen and <b>you now have ${
          this.owner.breasts.number
        } ${this.owner.breasts.adjective} ${this.owner.breasts.pluralized}!</b>
      </p>`

    return text
  }
}
