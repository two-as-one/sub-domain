import Transformation from "./_super"

/**
 * Changes the player's tail to a bovine tail if they have one
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "change tail to bovine"
  }

  get available() {
    return this.owner.tail.has && this.owner.tail.type !== "bovine"
  }

  apply() {
    this.owner.tail.type = "bovine"

    return `
      As you start walking, you immediately lose balance.
      It's as if your centre of gravity has changed.
      ${this.owner.who} examine yourself to find out why…

      **Your tail has turned into a bovine one!**`
  }
}
