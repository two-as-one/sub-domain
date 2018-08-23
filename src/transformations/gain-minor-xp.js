import Transformation from "./_super"

/**
 * Gain a minor amount of XP
 */
export default class MinorXP extends Transformation {
  get name() {
    return "gain minor xp"
  }

  get available() {
    return true
  }

  apply() {
    this.owner.giveXP(5)

    return `**you gained [xp]**`
  }
}
