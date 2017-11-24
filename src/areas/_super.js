import Chance from "chance"
import Saveable from "save/saveable"
const chance = new Chance()

/**
 * Area
 * This is the base class from which all areas must inherit from
 * refer to README.md for instructions on how to make custom areas
 */
export default class Area extends Saveable {
  constructor(game) {
    super()

    this.game = game
  }

  get savedAttribute() {
    return "stats"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      lvl: 0,
      current: false,
      discovered: false
    })
  }

  //discover this area
  discover() {
    this.stats.discovered = true
  }

  //leave this area
  leave() {
    this.stats.current = false
  }

  //enter this area
  enter() {
    this.stats.current = true
  }

  //level up this area
  lvlUp() {
    this.stats.lvl += 1
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
    if (this.stats.lvl < 5) {
      return "lost"
    } else if (this.stats.lvl < 20) {
      return "familiar"
    } else {
      return "at home"
    }
  }

  //get the correct description based on day/nigh cycle
  get description() {
    return this.game.world.day ? this.dayDescription : this.nightDescription
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

  //the key that will be used to save the state, make sure this doesn't collide with any other keys
  get saveKey() {
    return "area-super"
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
