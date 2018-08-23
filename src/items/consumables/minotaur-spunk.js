import Consumable from "./_super"

export default class MinotaurSpunk extends Consumable {
  get name() {
    return "vial of minotaur spunk"
  }

  get description() {
    return `
      An elongated vial containing what appears to be goopy cream.`
  }

  consume(player) {
    super.consume(player)

    return `
      You uncork the vial and immediately get overwhelmed by a potent musk.
      Quickly and without any hesitation you down its contents — Yuck!

      ${player.transform.pickOne(["minotaur cum"], 0.9)}`
  }
}
