import "styles/index.less"
import CharacterCreation from "states/character-creation"
import InventoryState from "states/inventory"
import LevelUpState from "states/level-up"
import MainState from "states/main"
import Player from "player/player"
import TitleScreen from "states/title-screen"
import World from "world"
import save from "save/save"

export default class Game {
  constructor() {
    document.addEventListener("click", e => this._click(e))
    document.addEventListener("mousemove", e => this._mouseMove(e))
    document.addEventListener("keydown", e => this._keyPress(e))
  }

  /** Initialize the game */
  initGame() {
    this.player = new Player()
    this.world = new World(this)
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
    const enter = Boolean(key.match(/Enter/))
    let focus = document.querySelector("body:not(.mouse-control) .option.focus")

    Game.mouseControl(false)

    if (num || up || down || enter) {
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

  /** Start a new game */
  newGame() {
    save.clear()
    this.initGame()
    this.switchState(new CharacterCreation(this))
  }

  /** Resume from previous save */
  resume() {
    this.initGame()
    this.switchState("main")
  }

  /**
   * Switch the game to a different state
   * @param  {(String|Object.State)} state - The state to switch to
   *                                {String} A specific know state to switch to
   *                                {Object.State} A state that has already been instantiated
   * @param {...args} - Any extra parameters that will be passed down to the new state's constructor
   */
  switchState(state, ...args) {
    if (this.currentState) {
      this.currentState.kill()
    }

    switch (state) {
      case "start":
        this.currentState = new TitleScreen(this, ...args)
        break
      case "new-game":
        this.newGame()
        break
      case "continue":
        this.resume()
        break
      case "inventory":
        this.currentState = new InventoryState(this)
        break
      case "main":
        this.currentState = new MainState(this, ...args)
        break
      case "level-up":
        this.currentState = new LevelUpState(this, ...args)
        break
      default:
        this.currentState = state
    }
  }
}
