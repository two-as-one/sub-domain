import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Grows a extra nipple if the player already has some - up to 4
 */
export default class NippleExtra extends Transformation {
  get name() {
    return "grow an extra nipple"
  }

  get available() {
    return this.owner.nipples.has && this.owner.nipples.quantity < 4
  }

  apply() {
    this.owner.nipples.add()

    const you = this.owner.who

    const text = `
      <p>
        Your chest feels tingly and hot.
        ${Grammar.capitalize(you)} look down and quickly realize why.
      </p>
      <p>
        <b>${Grammar.capitalize(
          this.owner.breasts.all
        )} have grown an additional nipple!</b>
      </p>`

    return text
  }
}
