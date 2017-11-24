import "styles/index.less"
import CharacterCreation from "states/character-creation"
import InventoryState from "states/inventory"
import LevelUpState from "states/level-up"
import MainState from "states/main"
import Player from "player/player"
import TitleScreen from "states/title-screen"
import World from "world"
import save from "save/save"

/* eslint-disable sort-imports */
import Beach from "areas/beach"
import Forest from "areas/forest"
/* eslint-enable  sort-imports */

export default class Game {
  constructor() {
    document.addEventListener("click", e => this._click(e))
    document.addEventListener("mousemove", e => this._mouseMove(e))
    document.addEventListener("keydown", e => this._keyPress(e))
  }

  initGame() {
    this.player = new Player()
    this.forest = new Forest(this)
    this.beach = new Beach(this)
    this.world = new World(this)
  }

  static mouseControl(on) {
    if (on) {
      document.body.setAttribute("mouse-control", true)
    } else {
      document.body.setAttribute("mouse-control", false)
    }
  }

  _mouseMove() {
    Game.mouseControl(true)
  }

  _click(e) {
    Game.mouseControl(true)
    const target = e.target.closest(".option")

    if (this.currentState.isTyping) {
      this.currentState.finishTyping()
    } else if (target) {
      this.pickOption(target)
    }
  }

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
      return this.pickOption(
        document.querySelector(`[choice="choice_${Number(num[2]) - 1}"]`)
      )
    }

    //select focus
    if (enter && focus) {
      return this.pickOption(focus)
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

  //saves the game
  save() {
    this.player.save()
    this.areas.forEach(area => area.save())
    this.world.save()
  }

  //pick an option
  pickOption(el) {
    if (!el) {
      return
    }

    this.currentState.interact(el.getAttribute("choice"))
  }

  newGame() {
    save.clear()
    this.initGame()
    this.switchState(new CharacterCreation(this))
  }

  resume() {
    this.initGame()
    this.switchState("main")
  }

  get areas() {
    return [this.forest, this.beach]
  }

  get availableAreas() {
    return this.areas.filter(area => area.stats.discovered)
  }

  get area() {
    return this.areas.find(area => area.stats.current)
  }

  switchArea(to) {
    if (this.area) {
      this.area.leave()
    }

    to.enter()
  }

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
      // case 'dialogue':
      //   this.currentState = new DialogueState(this, ...args);
      //   break;
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
