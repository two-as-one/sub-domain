import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Increases nipple size if the player has nipples
 */
export default class NippleGrowth extends Transformation {
  get name() {
    return "increase nipple size"
  }

  get available() {
    return (
      this.owner.parts.nipples.has &&
      this.owner.parts.nipples.size < this.owner.parts.breasts.size / 10
    )
  }

  apply() {
    this.owner.parts.nipples.grow()

    const you = this.owner.who

    const text = `
      <p>
        Your chest feels tingly and hot.
        ${Grammar.capitalize(you)} look down and quickly realize why.
      </p>
      <p>
        <b>Your nipples have swollen and permanently grown longer and thicker!</b>
      </p>`

    return text
  }
}
