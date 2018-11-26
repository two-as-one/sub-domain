import Transformation from "./_super"
import { lib } from "library/library"

export default class UdderGrowth extends Transformation {
  get name() {
    return "increase udder size"
  }

  get available() {
    return this.owner.udder.has
  }

  apply() {
    const udder = this.owner.udder

    udder.grow()
    udder.arouse(10)

    return lib("TRANSFORM_UDDER_GROWTH")
  }
}
