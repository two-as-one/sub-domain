import Transformation from "./_super"
import { lib } from "library/library"

export default class BreastsGrowth extends Transformation {
  get name() {
    return "increase breast size"
  }

  get available() {
    return this.owner.breasts.has
  }

  apply() {
    this.owner.breasts.grow()
    this.owner.breasts.arouse(10)

    return lib("TRANSFORM_BREASTS_GROWTH")
  }
}
