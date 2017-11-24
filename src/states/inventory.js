import State from "./_super"

export default class Inventory extends State {
  constructor(game) {
    super(game)

    this.state.list()
  }

  get FSMStates() {
    return [
      { name: "list", from: "*" },

      { name: "inspect", from: "list" },
      { name: "use", from: "inspect" },
      { name: "discard", from: "inspect" },

      { name: "exit", from: "*" }
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

    responses.push({ text: "back", state: "exit" })

    let text
    if (items.length === 0) {
      text = `You don't have any items.`
    } else {
      text = `These are the items you have.`
    }

    this.render({
      text: text,
      responses: responses
    })
  }

  inspect(data) {
    const item = data.item

    this.render({
      text: item.description,
      responses: [
        { text: "use", state: "use", item: item, if: item.isConsumable },
        { text: "discard", state: "discard", item: item },
        { text: "back", state: "list" }
      ]
    })
  }

  use(data) {
    const item = data.item

    const result = item.consume(this.game.player)
    this.game.player.inventory.discard(item.fileName)

    this.render({
      text: result,
      responses: [{ state: "list" }]
    })
  }

  discard(data) {
    const item = data.item
    let i = 0

    //discard all items of given name
    while (this.game.player.inventory.find(item.fileName)) {
      this.game.player.inventory.discard(item.fileName)
      i += 1
    }

    this.render({
      text: `You tossed away ${item.name} × ${i}`,
      responses: [{ state: "list" }]
    })
  }

  exit() {
    this.game.switchState("main")
  }
}
