import Part from "parts/_super"
import Transformation from "./_super"

/**
 * Increases udder size if the player has one
 */
export default class UdderGrowth extends Transformation {
  get name() {
    return "increase udder size"
  }

  get available() {
    return this.owner.parts.udder.has
  }

  apply() {
    this.owner.parts.udder.grow()

    let text = `Your teats start dripping with milk as `

    if (this.owner.parts.udder.quantity === 1) {
      text += `${this.owner.parts.udder.all} feels full to the brim`
    } else {
      text += `${this.owner.parts.udder.all} feel full to the brim`
    }

    text = `<p>${text}.</p>`

    if (this.owner.parts.udder.quantity === 1) {
      text += `<p><b>${Part.capitalize(
        this.owner.parts.udder.all
      )} has swollen permanently!</b></p>`
    } else {
      text += `<p><b>${Part.capitalize(
        this.owner.parts.udder.all
      )} have swollen permanently!</b></p>`
    }

    return text
  }
}