import Consumable from "./_super"

export default class TestItem extends Consumable {
  get name() {
    return "test item"
  }

  get description() {
    return `[DEV ITEM] This is a test item, it can be used to test transformations.`
  }

  consume(player) {
    super.consume(player)

    return `
      Test item used.

      ${player.transform.pickOne([
        //add the transformations you wish to test here
      ])}`
  }
}
