import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Changes the player's tail to a bovine tail if they have one
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "change tail to bovine"
  }

  get available() {
    return this.owner.parts.tail.has && this.owner.parts.tail.type !== "bovine"
  }

  apply() {
    this.owner.parts.tail.type = "bovine"

    const you = this.owner.who

    const text = `
      <p>
        As you start walking, you immediately lose balance.
        It's as if your center of gravity has changed.
        ${Grammar.capitalize(you)} examine yourself to find out why…
      </p>
      <p>
        <b>Your tail has turned into a bovine one!</b>
      </p>`

    return text
  }
}
