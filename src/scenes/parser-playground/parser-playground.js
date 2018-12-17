import "./style.less"
import Scene from "../_super"
import template from "./template.hbs"
import { library } from "library/library"
import { DEBUG } from "globals/debug"

const DEFAULT_TEXT = `
[your:adjective:breasts]
`

export default class ParserPlayground extends Scene {
  constructor(game) {
    super(game)

    Object.entries(this.game.listeners).forEach(listener =>
      document.removeEventListener(listener[0], listener[1])
    )

    this.state.main()
  }

  get FSMStates() {
    return [{ name: "main", from: "*" }]
  }

  async main() {
    document.body.innerHTML = template({})
    document.body.classList.add("full-width")

    this.input = document.getElementsByClassName("input")[0]
    this.output = document.getElementsByClassName("output")[0]

    this.input.value = DEFAULT_TEXT.trim()

    this.input.addEventListener("change", () => this.updateText())
    this.input.addEventListener("keyup", () => this.updateText())

    await this.updateText()

    this.input.select()
    this.input.focus()

    this.updateScroll()
  }

  // synchronizes the scroll between panels
  async updateScroll() {
    await new Promise(r => requestAnimationFrame(() => r()))

    if (this.prevScroll) {
      const outDiff = this.prevScroll.out - this.output.scrollTop
      const inDiff = this.prevScroll.in - this.input.scrollTop

      if (outDiff) {
        this.input.scrollTop = this.output.scrollTop
      } else if (inDiff) {
        this.output.scrollTop = this.input.scrollTop
      }
    }

    this.prevScroll = {
      out: this.output.scrollTop,
      in: this.input.scrollTop,
    }

    this.updateScroll()
  }

  async updateText() {
    DEBUG.PARSER = true
    DEBUG.PARSER_SEED = "test"

    if (this.updateQueued) {
      return
    }

    this.updateQueued = true

    await new Promise(r => setTimeout(() => r(), 500))
    await new Promise(r => requestAnimationFrame(() => r()))

    const val = this.input.value
    if (val != this.prev) {
      this.output.innerHTML = this.game.parse(val, true)
      this.prev = val
    }

    this.updateQueued = false
  }

  // attempts to debug an object by finding any properties containing dynamic text and putting them in the playground
  debug(something) {
    this.input.value = library.debug(something).join("\n\n")
    this.updateText()
  }
}
