import Scene from "./_super"

export default class InventoryScene extends Scene {
  constructor(game) {
    super(game)

    this.state.list()
  }

  get FSMStates() {
    return [
      { name: "list", from: "*" },
      { name: "inspect", from: "*" },
      { name: "end", from: "*" }
    ]
  }

  list() {
    const items = this.game.player.inventory.all

    const responses = items.map(item => ({
      state: "inspect",
      item: item,
      text: `${item.name} × ${this.game.player.inventory.quantity(
        item.fileName
      )}`
    }))

    responses.push({ text: "back", state: "end" })

    let text
    if (items.length === 0) {
      text = `You don't have any items.`
    } else {
      text = `These are the items you/have.`
    }

    this.render({
      text: text,
      responses: responses
    })
  }

  async inspect(data) {
    const item = data.item

    await this.game.subScene("item", item)
    this.state.list()
  }
}
