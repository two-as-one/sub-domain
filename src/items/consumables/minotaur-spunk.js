import Consumable from "./_super"

export default class MinotaurSpunk extends Consumable {
  get name() {
    return "vial of minotaur spunk"
  }

  get description() {
    return `
      <p>
        An elongated vial containing what appears to be goopy cream.
      </p>
      <p>
        <b>Restores ${this.hunger} hunger.</b>
      </p>`
  }

  consume(player) {
    super.consume(player)

    let text = `
      <p>
        You uncork the vial and immediately get overwhelmed by its potent musk.
        Without any hesitation you down its contents — Yuck!
      </p>`

    text += player.transform.pickOne(["minotaur cum"])

    return text
  }
}
