import Scene from "scenes/_super"
import { Dialogue } from "./dialogue-parser"

/**
 * DialogueEncounter
 */
export default class DialogueEncounter extends Scene {
  get FSMStates() {
    return [{ name: "input", from: "*" }, { name: "idle", from: "input" }]
  }

  get functions() {
    return {}
  }

  /** ingest a dialogue */
  ingest(template) {
    this.dialogue = new Dialogue(template, this.functions)
    this.state.input()
  }

  /**
   * idle
   * This state does nothing other than provide a way for the FSM to transition between input and idle and fire appropriate events
   */
  idle() {}

  /** accepted user input, use Dialogue to determine what to render */
  input(choice) {
    let result

    if (choice) {
      result = this.dialogue.interact(choice.next)
    } else {
      result = this.dialogue.start()
    }

    result.responses.forEach(r => {
      r.state = "input"
      r.next = r.id
      delete r.id
    })

    // render result
    if (result.responses.length) {
      this.render(result)
    }

    // move to idle state if possible
    if (this.state.can("idle")) {
      this.state.idle()
    }
  }
}
