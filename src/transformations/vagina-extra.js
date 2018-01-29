import Grammar from "utils/grammar"
import Transformation from "./_super"

/**
 * Grows an extra vagina (up to 3) if the player already has one
 */
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

    return `
      You/have an uncontrollable itch between your legs and the sensation builds up until you reach some sort of pseudo-orgasm.
      You feel a trickle down your inner thigh.
      Gasping — ${this.owner.who} look down and notice why.

      **You have grown a ${Grammar.ordinal(vagina.quantity - 1)} ${
      vagina.singular
    }!**`
  }
}
