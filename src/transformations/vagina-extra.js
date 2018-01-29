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
    this.owner.vagina.add()

    const you = this.owner.who

    let text = `
      <p>
        You/have an itch between your legs.
        Soon the sensation keeps building up until you reach some sort of pseudo-orgasm.
        You feel a trickle down your inner thigh.
        Gasping — ${you} look down and notice why.
      </p>`

    if (this.owner.vagina.quantity === 2) {
      text += `
        <p>
          <b>You have grown a second ${this.owner.vagina.singular}!</b>
        </p>`
    } else {
      text += `
        <p>
          <b>You have grown a third ${this.owner.vagina.singular}!</b>
        </p>`
    }

    return text
  }
}
