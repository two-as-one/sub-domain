import Transformation from "./_super"
import { lib } from "library/library"

export default class VaginaGrowth extends Transformation {
  get name() {
    return "increase vagina size"
  }

  get available() {
    return this.owner.vagina.has
  }

  apply() {
    const vagina = this.owner.vagina
    vagina.grow()
    vagina.arouse(10)

    return lib("TRANSFORM_VAGINA_GROWTH")
  }
}
