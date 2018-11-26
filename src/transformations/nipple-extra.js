import Transformation from "./_super"
import { lib } from "library/library"

export default class NippleExtra extends Transformation {
  get name() {
    return "grow an extra nipple"
  }

  get available() {
    return this.owner.nipples.has && this.owner.nipples.quantity < 4
  }

  apply() {
    this.owner.nipples.add()
    this.owner.nipples.arouse(10)

    lib("TRANSFORM_NIPPLE_EXTRA")
  }
}
