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

    breasts.grow()
    breasts.stored.milk += 1
    breasts.arouse(10)

    const milky = breasts.stored.milk === 1 ? "milky" : "milkier"

    return `
      Your chest starts aching as [your.breasts] feel *just so full*.
      [you] look down and notice beads of milk forming around [your.nipples].

      **[your.breasts]~>have grown ${milky}!**`
  }
}
