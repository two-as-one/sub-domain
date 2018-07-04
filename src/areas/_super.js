import Chance from "chance"
const chance = new Chance()

/**
 * Area
 * This is the base class from which all areas must inherit from
 * refer to README.md for instructions on how to make custom areas
 *
 * @abstract - this class cannot be instantiated directly and must be extended
 */
export default class Area {
  constructor(game) {
    if (new.target === Area) {
      throw new TypeError("Cannot construct Area instances directly")
    }

    this.game = game
  }

  get defaults() {
    return {
      lvl: 0,
      current: false,
      discovered: false
    }
  }

  /** This is the location of the area on the map */
  get position() {
    return { x: 0, y: 0 }
  }

  get discovered() {
    return Boolean(this.stored.discovered)
  }

  set discovered(val) {
    this.stored.discovered = Boolean(val)
  }

  get lvl() {
    return this.stored.lvl
  }

  set lvl(val) {
    this.stored.lvl = val
  }

  //discover this area
  discover() {
    this.discovered = true
  }

  //leave this area
  leave() {
    this.stored.current = false
  }

  //enter this area
  enter() {
    this.stored.current = true
  }

  //level up this area
  lvlUp() {
    this.stored.lvl += 1
  }

  /** get the distance between two areas */
  distance(other) {
    return Math.sqrt(
      Math.abs(
        Math.pow(this.position.x - other.position.x, 2) +
          Math.pow(this.position.y - other.position.y, 2)
      )
    )
  }

  //utility function for chanceJS which expects input as option objects:
  //[
  //  {option: 'something', weight: 1},
  //  {option: 'somethingElse', weight: 2}
  //]
  static weighted(options) {
    const weights = options.map(option => option.weight)
    return chance.weighted(options, weights).option
  }

  //determines how familiar the player is with this area
  get familiarity() {
    if (this.stored.lvl < 5) {
      return "lost"
    } else if (this.stored.lvl < 20) {
      return "familiar"
    } else {
      return "at home"
    }
  }

  //get the correct description based on day/nigh cycle
  get description() {
    if (this.game.world.day) {
      return this.dayDescription
    } else {
      return `
        Night has fallen.

        ${this.nightDescription}`
    }
  }

  // Extend these with area specific values
  //---------------------------------------

  //When extended, this function must return text or an encounter
  //remember to call super.explore()
  explore() {
    this.lvlUp()

    return ""
  }

  //the name of the area
  get name() {
    return "super"
  }

  //this message is shown the first time the player enters this area
  get introMessage() {
    return ""
  }

  //message when exploring the area
  get exploreMessage() {
    return ""
  }

  //the description of the area when at your camp during the day
  get dayDescription() {
    return ""
  }

  //the description of the area when at your camp during at night
  get nightDescription() {
    return ""
  }

  //description of the player's camp
  get campDescription() {
    return ""
  }

  //message shown when the player sleeps through the night
  get sleepMessage() {
    return ""
  }

  //message shown when the sun sets in this area
  get sunsetMessage() {
    return ""
  }

  //message shown when the sun rises in this area
  get sunriseMessage() {
    return ""
  }
}
