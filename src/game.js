import "styles/index.less"
import CharacterCreation from "states/character-creation"
import InventoryState from "states/inventory"
import LevelUpState from "states/level-up"
import MainState from "states/main"
import Mastrubate from "encounters/other/masturbate"
import MinotaurEncounter from "encounters/combat/minotaur"
import Player from "player/player"
import TitleScreen from "states/title-screen"
import World from "world"
import save from "save/save"

export default class Game {
  constructor() {
    this.init()

    document.addEventListener("click", e => this._click(e))
    document.addEventListener("mousemove", e => this._mouseMove(e))
    document.addEventListener("keydown", e => this._keyPress(e))
  }

  /** Toggle the game between mouse and keyboard control */
  static mouseControl(on) {
    if (on) {
      document.body.setAttribute("mouse-control", true)
    } else {
      document.body.setAttribute("mouse-control", false)
    }
  }

  /**
   * Detects when the mouse moves so that the game can switch between mouse and keyboard controls
   * @private
   */
  _mouseMove() {
    Game.mouseControl(true)
  }

  /**
   * Handles mouse controls
   * @private
   * Allows the user to click on options to select them
   */
  _click(e) {
    Game.mouseControl(true)
    const target = e.target.closest(".option")

    if (this.currentState.isTyping) {
      this.currentState.finishTyping()
    } else if (target) {
      this._pickOption(target)
    }
  }

  /**
   * Handles keyboard controls
   * @private
   * Listens for number keys to directly select options
   * Listens for up/down arrows to move focus around
   * Listens for Enter to select focussed option
   */
  _keyPress(e) {
    const key = e.code
    const num = key.match(/^(Digit|Numpad)([0-9])/)
    const up = key === "ArrowUp"
    const down = key === "ArrowDown"
    const back = key === "Escape" || key === "Backspace"
    const enter = Boolean(key.match(/Enter/))
    let focus = document.querySelector("body:not(.mouse-control) .option.focus")

    Game.mouseControl(false)

    if (num || up || down || enter || back) {
      e.preventDefault()
    }

    //complete typing animation
    if (this.currentState.isTyping) {
      return this.currentState.finishTyping()
    }

    //number keys
    if (num) {
      return this._pickOption(
        document.querySelector(`[choice="choice_${Number(num[2]) - 1}"]`)
      )
    }

    if (back) {
      return this._pickOption(document.querySelector("[back]"))
    }

    //select focus
    if (enter && focus) {
      return this._pickOption(focus)
    }

    //start focussing
    if (!focus && (up || down)) {
      return document.querySelector(".option").classList.add("focus")
    }

    //move focus up
    if (up && focus.previousElementSibling) {
      focus = focus.previousElementSibling
      //move focus down
    } else if (down && focus.nextElementSibling) {
      focus = focus.nextElementSibling
    } else {
      focus = null
    }

    if (focus) {
      document
        .querySelectorAll(".option.focus")
        .forEach(el => el.classList.remove("focus"))
      focus.classList.add("focus")
      focus.scrollIntoView(false)
    }
  }

  /**
   * Selects one of the options available on screen
   * @private
   * @param  {HTMLElement} el - The Element on the page
   */
  _pickOption(el) {
    if (!el) {
      return
    }

    this.currentState.interact(el.getAttribute("choice"))
  }

  /** saves the game */
  save() {
    this.player.save()
    this.world.save()
  }

  /** clears all progress */
  clear() {
    save.clear()
    this.init()
  }

  /** initializes game objects */
  init() {
    this.player = new Player()
    this.world = new World(this)
  }

  /**
   * Switch the game to a different state
   * @param  {String} state - The state name to switch to
   * @param {...args} - Any extra parameters to pass on to the state constructor
   */
  switchState(state, ...args) {
    if (this.currentState) {
      this.currentState.kill()
    }

    switch (state) {
      case "start":
        return (this.currentState = new TitleScreen(this))
      case "new-game":
        return (this.currentState = new CharacterCreation(this))
      case "inventory":
        return (this.currentState = new InventoryState(this))
      case "main":
        return (this.currentState = new MainState(this))
      case "level-up":
        return (this.currentState = new LevelUpState(this))
      case "masturbate":
        return (this.currentState = new Mastrubate(this))
      case "encounter":
        return (this.currentState = this.Encounter(...args))
      default:
        throw new Error(`Error: unknown game state: ${state}`)
    }
  }

  /** start an encounter by name */
  Encounter(name) {
    const encounter = this.ENCOUNTERS[name]
    return new encounter(this)
  }

  /**
   * List of encounters available to this game
   */
  get ENCOUNTERS() {
    return {
      minotaur: MinotaurEncounter
    }
  }
}
