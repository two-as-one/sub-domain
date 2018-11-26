import Transformation from "./_super"
import { lib } from "library/library"

export default class NippleGrowth extends Transformation {
  get name() {
    return "increase nipple size"
  }

  get available() {
    return (
      this.owner.nipples.has &&
      this.owner.nipples.size < this.owner.breasts.size / 10
    )
  }

  apply() {
    this.owner.nipples.grow()
    this.owner.nipples.arouse(10)

    return lib("TRANSFORM_NIPPLE_GROWTH")
  }
}
