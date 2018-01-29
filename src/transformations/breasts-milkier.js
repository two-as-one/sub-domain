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
    return this.owner.breasts.has
  }

  apply() {
    this.owner.breasts.grow()
    this.owner.breasts.stats.milk += 1

    const your_tits = this.owner.breasts.all
    const milky = this.owner.breasts.stats.milk === 1 ? "milky" : "milkier"

    const you = this.owner.who

    const text = `
      <p>
        Your chest starts aching as ${your_tits} feel <i>just so full</i>.
        ${Grammar.capitalize(
          you
        )} look down and notice beads of milk forming around your nipples.
      </p>
      <p>
        <b>${Grammar.capitalize(
          this.owner.breasts.all
        )} have grown ${milky}!</b>
      </p>`

    return text
  }
}
