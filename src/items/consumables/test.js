import Consumable from "./_super"

export default class TestItem extends Consumable {
  get name() {
    return "test item"
  }

  get description() {
    return `
      <p>
        [DEV ITEM] This is a test item, it can be used to test transformations.
      </p>`
  }

  consume(player) {
    super.consume(player)

    let text = `
      <p>
        Test item used.
      </p>`

    text += player.transform.pickOne([
      //add the transformations you wish to test here
    ])

    return text
  }
}
