import StateMachine from "javascript-state-machine"
import TypeWriter from "cool-typewriter"
import template from "templates/main.hbs"
import { DEBUG } from "globals/debug"

const typeWriter = new TypeWriter()

export default class Scene {
  constructor(game) {
    this.game = game
    this.locked = false

    this._currentOptions = []

    // allow outside code to await scene.completed
    this.completed = new Promise(r => (this._resolve = r))

    // this is the internal state of this game state
    const states = this.FSMStates
    states.forEach(state => (state.to = state.name))
    this.state = new StateMachine({ transitions: states })

    // when entering a state, call the function that maps to the current state
    // in a deferred timeout so that states are able to automatically move on to a different one
    this.state.observe("onEnterState", () =>
      setTimeout(() => this[this.state.state](this.choice), 0)
    )
  }

  // must be extended with internal state transitions
  get FSMStates() {
    return []
  }

  interact(id) {
    if (this.locked) {
      return
    }

    // map interaction choice to choice object
    const choice = this._currentOptions.find(option => option.id == id)
    const state = choice && choice.state

    if (choice.disabled) {
      return
    }

    this.choice = choice

    if (this.state.can(state)) {
      if (choice.fade) {
        this.fade().then(() => this.state[state]())
      } else {
        this.state[state]()
      }
    } else {
      throw new Error("Undefined state transition.")
    }
  }

  // ends this scene
  // if this was a sub-scene, its promise will be resolved
  // otherwise the game will switch back to the main scene
  end() {
    this._resolve()
  }

  pruneResponses(data) {
    // make sure we have responses
    if (!data.responses) {
      data.responses = []
    }

    // make sure there is at least one
    if (!data.responses.length) {
      data.responses.push({})
    }

    // filter by conditions
    data.responses = data.responses.filter(
      response => !response.hasOwnProperty("if") || response.if
    )

    data.text = this.game.parse(data.text)

    data.responses.forEach((response, i) => {
      if (!response.text) {
        response.text = "…"
      }

      if (/^(back|cancel|leave)$/i.test(response.text)) {
        response.back = true
      }

      if (!response.id) {
        response.id = "choice_" + i
      }

      response.index = i + 1

      if (response.index > 9) {
        delete response.index
      }

      response.text =
        response.text.charAt(0).toUpperCase() + response.text.slice(1)

      response.text = this.game
        .parse(response.text)
        .replace(/^<p>/, "")
        .replace(/<\/p>$/, "")
    })

    return data
  }

  get template() {
    return template
  }

  /** fades the current view (locking the interface) */
  fade() {
    this.locked = true
    document.body.classList.add("fade")
    return new Promise(resolve => setTimeout(() => resolve(), 1500))
  }

  /** renders content (unlocks the interface) */
  render(data = {}) {
    typeWriter.stop()

    data = this.pruneResponses(data)

    // store currently available options
    this._currentOptions = data.responses
    data.VERSION = VERSION

    // remove all classes
    while (document.body.classList.length) {
      document.body.classList.remove(document.body.classList.item(0))
    }

    // render html
    document.body.innerHTML = this.template(data)
    window.scrollTo(0, 0)

    // add new classes
    if (typeof data.classes === "string") {
      data.classes.split(/\s+/).forEach(c => document.body.classList.add(c))
    }

    this.type()
    this.locked = false
  }

  finishTyping() {
    typeWriter.complete()
  }

  type() {
    // no typing animation in debug mode
    if (DEBUG.PARSER) {
      return
    }

    typeWriter.type(document.getElementsByClassName("dialogue")[0])
    typeWriter.type(document.getElementsByClassName("options")[0])
    typeWriter.start()
  }

  get isTyping() {
    return typeWriter.started
  }
}
