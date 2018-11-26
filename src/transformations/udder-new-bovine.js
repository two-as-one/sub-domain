import Transformation from "./_super"
import { lib } from "library/library"

export default class UdderNewBovine extends Transformation {
  get name() {
    return "grow a bovine udder"
  }

  get available() {
    return !this.owner.udder.has
  }

  apply() {
    this.owner.udder.grow()
    this.owner.udder.teats = 4
    this.owner.udder.arouse(10)

    return lib("TRANSFORM_UDDER_NEW_BOVINE")
  }
}
