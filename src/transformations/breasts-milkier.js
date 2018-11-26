import Transformation from "./_super"
import { lib } from "library/library"

export default class BreastsMilkier extends Transformation {
  get name() {
    return "increase breast milk"
  }

  get available() {
    return this.owner.breasts.has && this.owner.breasts.milky
  }

  apply() {
    const breasts = this.owner.breasts

    breasts.grow()
    breasts.stored.milk += 1
    breasts.arouse(10)

    return lib("TRANSFORM_BREASTS_MILKIER")
  }
}
