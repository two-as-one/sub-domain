import "styles/title-screen.less"
import State from "./_super"
import save from "save/save"
import titleScreen from "templates/title.hbs"

export default class TitleScreen extends State {
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
      { name: "cancel", from: "new" }
    ]
  }

  title() {
    const data = { responses: [] }

    data.text = titleScreen()
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
      this.game.switchState("continue")
    }
  }

  outOfDate() {
    this.render({
      // prettier-ignore
      text: `
        <p>
          Your saved game [${save.fetch().VERSION}] does not match the latest version of the game [${VERSION}].
          You can still continue but this may cause unexpected bugs.
        </p>
        <p>
          We recommend starting a new game.
        </p>`,
      responses: [
        { text: "continue", state: "continue", force: true },
        { text: "cancel", state: "title" }
      ]
    })
  }

  new() {
    if (save.hasData) {
      this.render({
        text: `You will <b>lose any saved progress</b>, are you sure you want to start a <b>new adventure</b>?`,
        responses: [
          { text: "New game", state: "confirm" },
          { text: "Cancel", state: "cancel" }
        ]
      })
    } else {
      this.game.switchState("new-game")
    }
  }

  confirm() {
    this.game.switchState("new-game")
  }

  cancel() {
    this.state.title()
  }
}
