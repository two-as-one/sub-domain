import Consumable from "./_super"

export default class MeatyMushroom extends Consumable {
  get name() {
    return "meaty mushroom"
  }

  get description() {
    return `
      <p>
        A mushroom with a long, thick stalk and a small pinkish cap.
        It throbs when touched, just like a penis — even the texture feels like skin.
      </p>
      <p>
        <b>Restores ${this.hunger} hunger.</b>
      </p>`
  }

  consume(player) {
    super.consume(player)

    let text = `
      <p>You swallow the mushroom whole. You can feel it throbbing as it slides down your throat — lewd!</p>`

    if (Math.random() > 0.5) {
      text += player.transform.pickOne([
        "increase penis size",
        "grow a new penis"
      ])
    }

    return text
  }
}
