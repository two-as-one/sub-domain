import Transformation from "./_super"

/**
 * Increases milk production and grows breasts larger if the player has breasts
 */
export default class BreastMilkier extends Transformation {
  get name() {
    return "increase breast milk"
  }

  get available() {
    return this.owner.breasts.has
  }

  apply() {
    const breasts = this.owner.breasts
    const nipples = this.owner.nipples

    breasts.grow()
    breasts.stats.milk += 1
    breasts.arouse(10)

    const milky = breasts.stats.milk === 1 ? "milky" : "milkier"

    return `
      Your chest starts aching as ${breasts.all} feel *just so full*.
      ${this.owner.who} look down and notice beads of milk forming around ${
      nipples.all
    }.

      **${breasts.all} have grown ${milky}!**`
  }
}
