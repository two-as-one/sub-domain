import Consumable from "./_super"

export default class Milk extends Consumable {
  get name() {
    return "bottled milk"
  }

  get description() {
    return `
        A small bottle of milk — just enough for one portion.
        It's made out of sturdy glass and sealed shut with a cork.

        **Restores ${this.hunger} hunger.**`
  }

  consume(player) {
    super.consume(player)

    return `
      You uncork the bottle and down its contents. The sweet milk soothes you.

      ${player.transform.pickOne([
        "increase breast size",
        "grow a pair of breasts",
        "increase nipple size"
      ])}`
  }
}
