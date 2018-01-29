import Grammar from "utils/grammar"
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
    this.owner.udder.grow()

    let text = `Your teats start dripping with milk as `

    if (this.owner.udder.quantity === 1) {
      text += `${this.owner.udder.all} feels full to the brim`
    } else {
      text += `${this.owner.udder.all} feel full to the brim`
    }

    text = `<p>${text}.</p>`

    if (this.owner.udder.quantity === 1) {
      text += `<p><b>${Grammar.capitalize(
        this.owner.udder.all
      )} has swollen permanently!</b></p>`
    } else {
      text += `<p><b>${Grammar.capitalize(
        this.owner.udder.all
      )} have swollen permanently!</b></p>`
    }

    return text
  }
}
