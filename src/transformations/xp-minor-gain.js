import Transformation from "./_super"
import { lib } from "library/library"

export default class XPMinorGain extends Transformation {
  get name() {
    return "gain minor xp"
  }

  get available() {
    return true
  }

  apply() {
    this.owner.giveXP(5)

    return lib("XP_GAIN")
  }
}
