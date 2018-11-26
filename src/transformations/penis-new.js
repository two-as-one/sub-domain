import Transformation from "./_super"
import { lib } from "library/library"

export default class PenisNew extends Transformation {
  get name() {
    return "grow a new penis"
  }

  get available() {
    return !this.owner.penis.has
  }

  apply() {
    this.owner.penis.quantity = 1
    this.owner.penis.size = 2
    this.owner.penis.arouse(10)

    return lib("TRANSFORM_PENIS_NEW")
  }
}
