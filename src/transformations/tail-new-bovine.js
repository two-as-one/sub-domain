import Transformation from "./_super"
import { lib } from "library/library"

export default class TailNewBovine extends Transformation {
  get name() {
    return "grow bovine tail"
  }

  get available() {
    return !this.owner.tail.has
  }

  apply() {
    this.owner.tail.grow()
    this.owner.tail.type = "bovine"

    return lib("TRANSFORM_TAIL_NEW_BOVINE")
  }
}
