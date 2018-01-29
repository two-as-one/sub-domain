import Transformation from "./_super"

/**
 * Grows a bovine tail if the player has none
 */
export default class BreastGrowth extends Transformation {
  get name() {
    return "grow bovine tail"
  }

  get available() {
    return !this.owner.tail.has
  }

  apply() {
    this.owner.tail.grow()
    this.owner.tail.type = "bovine"

    return `
      You have an itching sensation in your lower back and as you reach down to scratch you realize where it's coming from…

      **You now have a bovine tail!**`
  }
}
