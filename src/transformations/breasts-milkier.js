import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Increases milk production and grows breasts larger if the player has breasts
 */
export default class BreastMilkier extends Transformation {
  get name() {
    return "increase breast milk"
  }

  get available() {
    return this.owner.parts.breasts.has
  }

  apply() {
    this.owner.parts.breasts.grow()
    this.owner.parts.breasts.stats.milk += 1

    const your_tits = this.owner.parts.breasts.all
    const milky =
      this.owner.parts.breasts.stats.milk === 1 ? "milky" : "milkier"

    const text = `
      <p>
        Your chest starts aching as ${your_tits} feel <i>just so full</i>.
        You look down and notice beads of milk forming around your nipples.
      </p>
      <p>
        <b>${Grammar.capitalize(
          this.owner.parts.breasts.all
        )} have grown ${milky}!</b>
      </p>`

    return text
  }
}
