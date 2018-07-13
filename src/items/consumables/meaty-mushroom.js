import Consumable from "./_super"

export default class MeatyMushroom extends Consumable {
  get name() {
    return "meaty mushroom"
  }

  get description() {
    return `
      A mushroom with a long, thick stalk and a small pinkish cap. It has a
      skin-like texture and throbs inexplicably when you touch it — weird!

      **Restores ${this.hunger} hunger.**`
  }

  consume(player) {
    super.consume(player)

    return `
      You swallow the mushroom whole. You can feel it throbbing as it slides
      down your throat — lewd!

      ${player.transform.pickOne(["increase penis size", "grow a new penis"])}`
  }
}
