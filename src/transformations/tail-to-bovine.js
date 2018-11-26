import Transformation from "./_super"
import { lib } from "library/library"

export default class TailToBovine extends Transformation {
  get name() {
    return "change tail to bovine"
  }

  get available() {
    return this.owner.tail.has && this.owner.tail.type !== "bovine"
  }

  apply() {
    this.owner.tail.type = "bovine"

    return lib("TRANSFORM_TAIL_TO_BOVINE")
  }
}
