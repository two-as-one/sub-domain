import Consumable from "./_super"

export default class Milk extends Consumable {
  get name() {
    return "bottled milk"
  }

  get description() {
    return `
      <p>
        A small bottle of milk — just enough for one portion.
        The bottle is made of sturdy glass and sealed shut with a cork.
      </p>
      <p>
        <b>Restores ${this.hunger} hunger.</b>
      </p>`
  }

  consume(player) {
    super.consume(player)

    let text = `
      <p>You uncork the bottle and down its contents. The sweet milk soothes you.</p>`

    text += player.transform.pickOne([
      "increase breast size",
      "grow a pair of breasts",
      "increase nipple size"
    ])

    return text
  }
}
