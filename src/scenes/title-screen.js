import "styles/title-screen.less"
import Scene from "./_super"
import save from "save/save"
import titleScreen from "templates/title.hbs"
import { lib } from "library/library"

export default class TitleScreenScene extends Scene {
  constructor(game) {
    super(game)

    this.state.title()
  }

  get FSMStates() {
    return [
      { name: "title", from: "*" },
      { name: "continue", from: ["title", "outOfDate"] },
      { name: "outOfDate", from: "continue" },
      { name: "new", from: "title" },
      { name: "confirm", from: "new" },
      { name: "cancel", from: "new" },
    ]
  }

  title() {
    const data = { responses: [] }

    data.static = titleScreen()
    data.classes = "title-screen"

    if (save.hasData) {
      data.responses.push({ text: "continue", state: "continue" })
    }
    data.responses.push({ text: "New game", state: "new" })

    this.render(data)
    this.finishTyping()
  }

  continue(options) {
    if (save.isOutOfDate && !options.force) {
      this.state.outOfDate()
    } else {
      this.game.setScene("main")
    }
  }

  outOfDate() {
    this.render({
      text: lib("TITLE_INCOMPATIBLE_SAVE")
        .replace("$1", save.fetch().VERSION)
        .replace("$2", VERSION),
      responses: [
        { text: "continue", state: "continue", force: true },
        { text: "cancel", state: "title" },
      ],
    })
  }

  new() {
    if (save.hasData) {
      this.render({
        text: lib("TITLE_CONFIRM_NEW_GAME"),
        responses: [
          { text: "New game", state: "confirm" },
          { text: "Cancel", state: "cancel" },
        ],
      })
    } else {
      this.game.setScene("new-game")
    }
  }

  confirm() {
    this.game.setScene("new-game")
  }

  cancel() {
    this.state.title()
  }
}
