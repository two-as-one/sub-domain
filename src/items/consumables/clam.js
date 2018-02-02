import Consumable from "./_super"

export default class Clam extends Consumable {
  get name() {
    return "peculiar clam"
  }

  get description() {
    return `
      A large fist-sized clam.
      It stays open, even as you poke the fleshy and moist insides — quite unlike any clam you've ever seen.

      **Restores ${this.hunger} hunger.**`
  }

  consume(player) {
    super.consume(player)

    return `
      You gobble up the fleshy insides of the clam.
      All those slick juices make it slip effortlessly down your throat.
      It tastes salty like sea water.

      ${player.transform.pickOne([
        "increase vagina size",
        "grow a new vagina"
      ])}`
  }
}
