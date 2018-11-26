import Transformation from "./_super"
import { lib } from "library/library"

export default class BreastsQuartet extends Transformation {
  get name() {
    return "grow four breasts"
  }

  get available() {
    return this.owner.breasts.has && this.owner.breasts.quantity !== 4
  }

  apply() {
    const breasts = this.owner.breasts

    breasts.quantity = 4
    breasts.arouse(10)

    return lib("TRANSFORM_BREASTS_QUARTET")
  }
}
