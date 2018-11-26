/**
 * class that represents a position in an encounter
 */
export class Position {
  constructor(player, enemy, config) {
    this.player = player
    this.enemy = enemy
    this.config = config
  }

  get name() {
    return this.config.name || ""
  }

  get prefix() {
    return this.config.prefix || ""
  }

  get infects() {
    return Boolean(this.config.infects)
  }

  // check whether this position is available for use
  get available() {
    const player = this.config.player.every(part => this.player.has[part])
    const enemy = this.config.enemy.every(part => this.enemy.has[part])

    return Boolean(player && enemy && this.evalCondition)
  }

  // evaluates extra conditions
  get evalCondition() {
    let ok = true

    if (this.config.condition) {
      try {
        ok = new Function(
          '"use strict";return (' + this.config.condition + ")"
        )()
      } catch (e) {
        console.error(`Invalid config - ${this.config.condition}`)
      }
    }

    return ok
  }

  // get the body parts that are the focus of this position
  get focus() {
    return {
      player: this.player[this.config.player[0]],
      enemy: this.enemy[this.config.enemy[0]],
    }
  }

  // check whether this position is enabled
  // this is different from available because it will still be visible in the interface but not be selectable by the player
  get enabled() {
    return this.config.player.every(part => this.player[part].functional)
  }

  get disabled() {
    return !this.enabled
  }
}
