import Consumable from "./_super"

export default class Rock extends Consumable {
  get name() {
    return "a rock"
  }

  get description() {
    return `
      <p>
        It's just a rock.
        You're not quite sure why you picked it up.
        There's nothing particularily interesting about it.
      </p>`
  }

  get hunger() {
    return 0
  }

  consume(player) {
    super.consume(player)

    return `<p>You threw the rock as far as you could. Clever.</p>`
  }
}
