import Saveable from "save/saveable"

/* eslint-disable sort-imports */
import Beach from "areas/beach"
import Forest from "areas/forest"
/* eslint-enable  sort-imports */

const DAWN = 8
const DUSK = 20
const MIDNIGHT = 24

export default class World extends Saveable {
  constructor(game) {
    super()

    this.game = game
    this.transitioned = false //keep track of when the world transitions between day/nigh so that we can show a relevant message

    this.forest = new Forest(game)
    this.beach = new Beach(game)
  }

  get saveKey() {
    return "world"
  }

  get savedAttribute() {
    return "data"
  }

  get defaults() {
    return {
      day: 1,
      hour: 12
    }
  }

  /** save world progress */
  save() {
    super.save()
    this.areas.forEach(area => area.save())
  }

  /** List all areas */
  get areas() {
    return [this.forest, this.beach]
  }

  /** List of areas available to the player */
  get availableAreas() {
    return this.areas.filter(area => area.stats.discovered)
  }

  /** The current area */
  get area() {
    return this.areas.find(area => area.stats.current)
  }

  /**
   * Change which area we are currently in
   * @param  {Object.Area} to - The new current area
   */
  switchArea(to) {
    if (this.area) {
      this.area.leave()
    }

    to.enter()
    this.advance()
  }

  /**
   * Advances time and saves the game
   * @param  {Number=1} [number] - (optional) Advances a specific number of times
   * @param  {Boolean=false} [resting] - (optional) When resting is true, the player will also heal a % of health
   */
  advance(number = 1, resting = false) {
    const current = this.day

    for (let i = 0; i < number; i++) {
      this.game.player.metabolize()

      if (resting) {
        this.game.player.heal(Math.ceil(this.game.player.maxHP / 10))
      }

      this.data.hour += 1
      if (this.data.hour >= MIDNIGHT) {
        this.data.hour = 0
        this.data.day += 1
      }
    }

    this.game.save()

    //store whether the world state has transitioned between day/night so that we can play a fade animation
    if (this.day !== current) {
      this.transitioned = true
    }
  }

  /** advances time until dawn */
  advanceToDawn() {
    const hours = MIDNIGHT - this.data.hour + DAWN
    this.advance(hours, true)
  }

  /** rest until healed */
  advanceUntilHealed() {
    const hours = Math.ceil(
      (this.game.player.maxHP - this.game.player.currentHP) /
        (this.game.player.maxHP / 10)
    )

    this.advance(hours, true)
  }

  /** true if the world is at night time */
  get night() {
    return this.data.hour < DAWN || this.data.hour > DUSK
  }

  /** true if the world is at day time */
  get day() {
    return !this.night
  }
}
