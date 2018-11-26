import Transformation from "./_super"
import { lib } from "library/library"

export default class PenisGrowth extends Transformation {
  get name() {
    return "increase penis size"
  }

  get available() {
    return this.owner.penis.has
  }

  apply() {
    const penis = this.owner.penis

    penis.grow()
    penis.arouse(10)

    return lib("TRANSFORM_PENIS_GROWTH")
  }
}
