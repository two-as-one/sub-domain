import Part from "parts/_super"
import Perk from "./_super"

export default class Impotent extends Perk {
  get name() {
    return "impotent"
  }

  get description() {
    const verb = this.player.parts.penis.quanitity > 1 ? "are" : "is"
    return `${Part.capitalize(this.player.parts.penis.all)} ${
      verb
    } limp and useless.`
  }

  get effect() {
    return `You can't get hard and ${
      this.player.parts.penis.all
    } can't be used for any sexual moves.`
  }

  get available() {
    return this.player.parts.penis.has
  }
}
