import Beach from "areas/beach"
import Forest from "areas/forest"

import { persist } from "save/saveable"

const DAWN = 8
const DUSK = 20
const MIDNIGHT = 24

export default class World {
  constructor(game) {
    this.game = game

    // keep track of when the world transitions between day/nigh so that we can show a relevant message
    this.transitioned = false

    persist(this, "world")

    this.forest = new Forest(game)
    this.beach = new Beach(game)
  }

  get defaults() {
    return {
      day: 1,
      hour: 12,
    }
  }

  /** save world progress */
  save() {
    super.save()
    this.areas.forEach(area => area.save())
  }

  get time() {
    return {
      day: this.stored.day,
      hour: this.stored.hour,
    }
  }

  /** List all areas */
  get areas() {
    return [this.forest, this.beach]
  }

  /** List of areas available to the player */
  get availableAreas() {
    return this.areas.filter(area => area.stored.discovered)
  }

  /** The current area */
  get area() {
    return this.areas.find(area => area.stored.current)
  }

  /**
   * Change which area we are currently in
   * @param  {Object.Area} to - The new current area
   * @return {Number}         The amount of time that was advanced
   */
  switchArea(to) {
    const distance = Math.ceil(this.area.distance(to))

    if (this.area) {
      this.area.leave()
    }

    to.enter()
    this.advance(distance)

    return distance
  }

  /**
   * Advances time and saves the game
   * @param  {Number=1} [number] - (optional) Advances a specific number of times
   * @param  {Boolean=false} [resting] - (optional) When resting is true, the player will also heal a % of health
   */
  advance(number = 1, resting = false) {
    const current = this.day

    for (let i = 0; i < number; i++) {
      if (resting) {
        this.game.player.heal(Math.ceil(this.game.player.healthMax / 10))
      }

      this.stored.hour += 1
      if (this.stored.hour >= MIDNIGHT) {
        this.stored.hour = 0
        this.stored.day += 1
      }
    }

    this.game.save()

    // store whether the world state has transitioned between day/night so that we can play a fade animation
    if (this.day !== current) {
      this.transitioned = true
    }
  }

  /** advances time until dawn */
  advanceToDawn() {
    const hours = MIDNIGHT - this.stored.hour + DAWN
    this.advance(hours, true)
  }

  /** rest until healed */
  advanceUntilHealed() {
    const hours = Math.ceil(
      (this.game.player.healthMax - this.game.player.health) /
        (this.game.player.healthMax / 10)
    )

    this.advance(hours, true)
  }

  /** true if the world is at night time */
  get night() {
    return this.stored.hour < DAWN || this.stored.hour > DUSK
  }

  /** true if the world is at day time */
  get day() {
    return !this.night
  }
}
