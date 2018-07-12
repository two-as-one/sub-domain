import Transformation from "./_super"

/**
 * Increases udder size if the player has one
 */
export default class UdderGrowth extends Transformation {
  get name() {
    return "increase udder size"
  }

  get available() {
    return this.owner.udder.has
  }

  apply() {
    const udder = this.owner.udder

    udder.grow()
    udder.arouse(10)

    return `
      Your teats start dripping with milk as ${udder.all}~>feel full to the
      brim.

      **${udder.all}~>have swollen permanently!**`
  }
}
