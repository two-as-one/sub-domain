import Consumable from "./_super"

export default class Clam extends Consumable {
  get name() {
    return "peculiar clam"
  }

  get description() {
    return `
      <p>
        A large fist-sized clam.
        It stays open as you poke the fleshy and moist insides — quite unlike any clam you've ever seen.
      </p>
      <p>
        <b>Restores ${this.hunger} hunger.</b>
      </p>`
  }

  consume(player) {
    super.consume(player)

    let text = `
      <p>
        You gobble up the fleshy insides of the clam.
        It tastes salty like sea water.
        All those slick juices make it slip down your throat.
      </p>`

    text += player.transform.pickOne([
      "grow an extra vagina",
      "grow a new vagina"
    ])

    return text
  }
}
