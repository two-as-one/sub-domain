import Consumable from "./_super"

export default class Rock extends Consumable {
  get name() {
    return "a rock"
  }

  get description() {
    return `
      It's just a rock.
      You're not quite sure why you even picked it up.
      There's nothing particularly interesting about it.`
  }

  get hunger() {
    return 0
  }

  consume(player) {
    super.consume(player)

    return `You threw the rock as far as you could. Clever.`
  }
}
