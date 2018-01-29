import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Grows a bovine udder if the player has none
 */
export default class BovineUdderGrowth extends Transformation {
  get name() {
    return "grow a bovine udder"
  }

  get available() {
    return !this.owner.udder.has
  }

  apply() {
    this.owner.udder.grow()
    this.owner.udder.teats = 4

    const you = this.owner.who

    const text = `
      <p>
        Your tummy feels sensitive and bloated.
        ${Grammar.capitalize(you)} examine yourself to find out why.
      </p>
      <p>
        You have grown <b>a perky udder</b> with <b>four sensitive teats</b>!
      </p>`

    return text
  }
}
