import Saveable from "save/saveable"

const DAWN = 8
const DUSK = 20
const MIDNIGHT = 24

export default class World extends Saveable {
  constructor(game) {
    super()

    this.game = game
    this.transitioned = false //keep track of when the world transitions between day/nigh so that we can show a relevant message
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

  //advances time and saves the game
  advance(number) {
    const current = this.day

    if (typeof number === "number") {
      for (let i = 0; i < number; i++) {
        this.advance()
      }
      return
    }

    this.game.player.metabolize()

    this.data.hour += 1
    if (this.data.hour >= MIDNIGHT) {
      this.data.hour = 0
      this.data.day += 1
    }

    this.game.save()

    if (this.day !== current) {
      this.transitioned = true
    }
  }

  //advances time until dawn
  advanceToDawn() {
    this.advance(MIDNIGHT - this.data.hour + DAWN)
  }

  get night() {
    return this.data.hour < DAWN || this.data.hour > DUSK
  }

  get day() {
    return !this.night
  }
}
