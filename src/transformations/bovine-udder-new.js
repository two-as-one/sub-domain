import Transformation from "./_super"

/**
 * Grows a bovine udder if the player has none
 */
export default class BovineUdderGrowth extends Transformation {
  get name() {
    return "grow a bovine udder"
  }

  get available() {
    return !this.owner.parts.udder.has
  }

  apply() {
    this.owner.parts.udder.grow()
    this.owner.parts.udder.teats = 4

    const text = `
      <p>
        Your tummy feels sensitive and bloated. You examine yourself to find out why.
      </p>
      <p>
        You have grown <b>a perky udder</b> with <b>four sensitive teats</b>!
      </p>`

    return text
  }
}
