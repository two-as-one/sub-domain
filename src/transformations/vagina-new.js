import Transformation from "./_super"

/**
 * Grows a new vagina if the player has none
 */
export default class VaginaNew extends Transformation {
  get name() {
    return "grow a new vagina"
  }

  get available() {
    return !this.owner.parts.vagina.has
  }

  apply() {
    this.owner.parts.vagina.add()

    const you = this.owner.who

    return `
      <p>
        You feel a warmth radiating from your nether regions.
        It quickly grows stronger and starts feeling good — <i>really good</i>.
        It doesn't take long for ${you} to cry out with joy.
        Overwhelmed by an orgasm unlike any you've had before.
      </p>
      <p>
        <b>You have grown a brand new ${this.owner.parts.vagina.singular}!</b>
      </p>`
  }
}
