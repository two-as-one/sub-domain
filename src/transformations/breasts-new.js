import Transformation from "./_super"
import { lib } from "library/library"

export default class BreastsNew extends Transformation {
  get name() {
    return "grow a pair of breasts"
  }

  get available() {
    return !this.owner.breasts.has
  }

  apply() {
    const breasts = this.owner.breasts

    breasts.quantity = 2
    breasts.size = 1
    breasts.arouse(10)

    return lib("TRANSFORM_BREASTS_NEW")
  }
}
