import "styles/index.less"
import { clear, save } from "save/saveable"
import Grammar from "grammar/grammar"
import CharacterCreation from "encounters/dialogue/character-creation/scene"
import InventoryScene from "scenes/inventory"
import ItemScene from "scenes/item"
import LevelUpScene from "scenes/level-up"
import MainScene from "scenes/main"
import ParserPlayground from "scenes/parser-playground/parser-playground"
import Player from "player/player"
import TitleScreen from "scenes/title-screen"
import World from "world"
import Nobody from "entities/nobody"
import Alice from "entities/alice"
import Bob from "entities/bob"
import Charlie from "entities/charlie"
import Rock from "items/consumables/rock"

import { Factory } from "encounters/all"

class Game {
  constructor() {
    this.init()

    this.listeners = {
      click: e => this._click(e),
      mousemove: e => this._mouseMove(e),
      keydown: e => this._keyPress(e),
    }

    Object.entries(this.listeners).forEach(listener =>
      document.addEventListener(listener[0], listener[1])
    )
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
    this.player = new Player(this)
    this.world = new World(this)

    // fallback [foe] for the parser
    this.nobody = new Nobody(this)

    // test entities for the parser
    this.bob = new Bob(this)
    this.alice = new Alice(this)
    this.charlie = new Charlie(this)

    // fallback [item] for the parser
    this.rock = new Rock()
  }

  parse(text, debug = this.debug) {
    return Grammar.clean(text, debug)
  }

  /**
   * Switch the game to a different scene
   * when the scene ends, the game will go back to the main scene
   * @param  {String} name - The scene name to switch to
   * @param {...args} - Any extra parameters to pass on to the scene constructor
   */
  async setScene(name, ...args) {
    this.scene = this._createScene(name, ...args)
    await this.scene.completed
    this.setScene("main")
  }

  /**
   * switch to a sub-scene
   * similar to `setScene` except that it returns a promise that resolves once the scene is completed
   * You ideally want to use async/await for this:
   *   await game.subScene(...
   */
  async subScene(scene, ...args) {
    const prev = this.scene
    this.scene = this._createScene(scene, ...args)
    await this.scene.completed
    this.scene = prev
  }

  /**
   * creates a scene
   * @private
   */
  _createScene(name, ...args) {
    switch (name) {
      case "start":
        return new TitleScreen(this, ...args)
      case "parser-playground":
        return new ParserPlayground(this, ...args)
      case "new-game":
        return new CharacterCreation(this, ...args)
      case "inventory":
        return new InventoryScene(this, ...args)
      case "item":
        return new ItemScene(this, ...args)
      case "main":
        return new MainScene(this, ...args)
      case "level-up":
        return new LevelUpScene(this, ...args)
      case "masturbate":
        return Factory(this, name, ...args)
      case "encounter":
        return Factory(this, ...args)
      default:
        throw new Error(`Error: unknown game scene: ${name}`)
    }
  }
}

export default new Game()
