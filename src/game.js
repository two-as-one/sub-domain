import "styles/index.less"
import { clear, save } from "save/saveable"
import CharacterCreation from "scenes/character-creation"
import InventoryScene from "scenes/inventory"
import LevelUpScene from "scenes/level-up"
import MainScene from "scenes/main"
import Mastrubate from "encounters/other/masturbate"
import Player from "player/player"
import TitleScreen from "scenes/title-screen"
import World from "world"

class Game {
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

    if (this.scene.isTyping) {
      this.scene.finishTyping()
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
    if (this.scene.isTyping) {
      return this.scene.finishTyping()
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

    this.scene.interact(el.getAttribute("choice"))
  }

  /** saves the game */
  save() {
    save()
  }

  /** clears all progress */
  clear() {
    clear()
    this.init()
  }

  /** initializes game objects */
  init() {
    this.player = new Player()
    this.world = new World(this)
  }

  /**
   * Switch the game to a different scene
   * @param  {String} scene - The scene name to switch to
   * @param {...args} - Any extra parameters to pass on to the scene constructor
   */
  setScene(scene, ...args) {
    if (this.scene) {
      this.scene.kill()
    }

    switch (scene) {
      case "start":
        return (this.scene = new TitleScreen(this))
      case "new-game":
        return (this.scene = new CharacterCreation(this))
      case "inventory":
        return (this.scene = new InventoryScene(this))
      case "main":
        return (this.scene = new MainScene(this))
      case "level-up":
        return (this.scene = new LevelUpScene(this))
      case "masturbate":
        return (this.scene = new Mastrubate(this))
      case "encounter":
        return (this.scene = this.Encounter(...args))
      default:
        throw new Error(`Error: unknown game scene: ${scene}`)
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
      minotaur: require("encounters/combat/minotaur").default
      //"phallic shrine": require("encounters/dialogue/phallic-shrine").default
    }
  }
}

export default new Game()
