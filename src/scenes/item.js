import Scene from "./_super"

export default class ItemScene extends Scene {
  constructor(game, item) {
    super(game)

    this.item = item

    this.state.inspect()
  }

  get FSMStates() {
    return [
      { name: "inspect", from: "*" },
      { name: "use", from: "inspect" },
      { name: "discard", from: "inspect" },
      { name: "end", from: "*" },
    ]
  }

  inspect() {
    this.render({
      text: this.item.description,
      responses: [
        { text: "use", state: "use", if: this.item.isConsumable },
        { text: "discard", state: "discard" },
        { text: "back", state: "end" },
      ],
    })
  }

  use() {
    const item = this.item

    // consume and discard item
    const result = item.consume(this.game.player)
    this.game.player.inventory.discard(item.fileName)

    // check if any are left
    const more = this.game.player.inventory.find(item.fileName)

    this.render({
      text: result,
      responses: [{ state: more ? "inspect" : "end" }],
    })
  }

  discard() {
    const item = this.item
    let i = 0

    // discard all items of given name
    while (this.game.player.inventory.find(item.fileName)) {
      this.game.player.inventory.discard(item.fileName)
      i += 1
    }

    this.render({
      text: `You tossed away ${item.name} × ${i}`,
      responses: [{ state: "end" }],
    })
  }
}
