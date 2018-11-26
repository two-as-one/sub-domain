import Transformation from "./_super"
import { lib } from "library/library"

export default class VaginaNew extends Transformation {
  get name() {
    return "grow a new vagina"
  }

  get available() {
    return !this.owner.vagina.has
  }

  apply() {
    const vagina = this.owner.vagina
    vagina.quantity = 1
    vagina.size = 0.2
    vagina.arouse(99999)

    return lib("TRANSFORM_VAGINA_NEW")
  }
}
