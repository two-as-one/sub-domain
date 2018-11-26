import Transformation from "./_super"
import { lib } from "library/library"

export default class VaginaExtra extends Transformation {
  get name() {
    return "grow an extra vagina"
  }

  get available() {
    return this.owner.vagina.has && this.owner.vagina.quantity < 3
  }

  //diminishing returns
  get chance() {
    switch (this.owner.vagina.quantity) {
      case 1:
        return 0.1
      case 2:
        return 0.05
      default:
        return 0
    }
  }

  apply() {
    const vagina = this.owner.vagina

    vagina.add()
    vagina.arouse(30)

    return lib("TRANSFORM_VAGINA_EXTRA")
  }
}
