import Part from "parts/_super"
import Perk from "./_super"

export default class Impotent extends Perk {
  get name() {
    return "impotent"
  }

  get description() {
    const your_penis = Part.capitalize(this.player.parts.penis.all)
    const is = this.player.parts.penis.quanitity > 1 ? "are" : "is"

    return `${your_penis} ${is} limp and useless.`
  }

  get effect() {
    const your_penis = this.player.parts.penis.all
    return `You can't get hard and ${your_penis} can't be used for any sexual moves.`
  }

  get available() {
    return this.player.parts.penis.has
  }
}
