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
    this.owner.udder.arouse(10)

    return `
      Your tummy feels sensitive and bloated.
      ${this.owner.who} examine yourself to find out why.

      You have grown **a perky udder** with **four sensitive teats**!`
  }
}
