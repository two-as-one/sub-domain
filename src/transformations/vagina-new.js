import Transformation from "./_super"

/**
 * Grows a new vagina if the player has none
 */
export default class VaginaNew extends Transformation {
  get name() {
    return "grow a new vagina"
  }

  get available() {
    return !this.owner.vagina.has
  }

  apply() {
    const vagina = this.owner.vagina
    vagina.quantity = 1
    vagina.size = 0.2
    vagina.arouse(99999)

    return `
        You feel a warmth radiating from your nether regions. It quickly grows
        stronger and starts feeling good — *really good*. The sensation
        overwhelms [you] and you soon find yourself crying out with joy.

        **You have grown a brand new pussy!**`
  }
}
