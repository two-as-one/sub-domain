import { abstract } from "utils/abstract"

/**
 * class that represents a position in an encounter
 */
export class Position {
  constructor(player, playerParts = [], enemy, enemyParts = []) {
    abstract(
      this,
      "idle",
      "playerStart",
      "playerContinue",
      "enemyStart",
      "enemyContinue",
      "climax"
    )

    this.player = player
    this.enemy = enemy

    // the name of this position
    this.name = ""

    if (playerParts.length < 1 || enemyParts.length < 1) {
      throw new Error("Position must have at least 1 player and 1 enemy part")
    }

    // the parts the player uses to achieve this position
    // note that the first part in this list will be considered the focus of this position and will be used to determine lust gained
    this.playerParts = playerParts

    // the parts the enemy uses to achieve this position
    // note that the first part in this list will be considered the focus of this position and will be used to determine lust gained
    this.enemyParts = enemyParts

    // whether this position has a risk of infection
    this.infects = false
  }

  /**
   * Get the text associated with a specific action on this position
   * @param {String} action
   * valid actions:
   *   `idle`
   *   `player.start`
   *   `enemy.start`
   *   `player.continue`
   *   `enemy.continue`
   *   `climax`
   */
  get(action) {
    switch (action) {
      case "idle":
        return this.idle(this.player, this.enemy)
      case "player.start":
        return this.playerStart(this.player, this.enemy)
      case "enemy.start":
        return this.enemyStart(this.player, this.enemy)
      case "player.continue":
        return this.playerContinue(this.player, this.enemy)
      case "enemy.continue":
        return this.enemyContinue(this.player, this.enemy)
      case "climax":
        return this.climax(this.player, this.enemy)
    }

    return ""
  }

  // check whether this position is available for use
  get available() {
    const player = this.playerParts.every(part => this.player.has[part])
    const enemy = this.enemyParts.every(part => this.enemy.has[part])

    return Boolean(player && enemy)
  }

  // get the body parts that are the focus of this position
  get focus() {
    return {
      player: this.playerParts[0],
      enemy: this.enemyParts[0]
    }
  }

  // check whether this position is enabled
  // this is different from available because it will still be visible in the interface but not be selectable by the player
  get enabled() {
    return this.playerParts.every(part => this.player[part].functional)
  }

  get disabled() {
    return !this.enabled
  }

  // Messages - extend these with position specific messages
  //--------------------------------------------------------

  idle(player, enemy) {
    return ""
  }

  playerStart(player, enemy) {
    return ""
  }

  enemyStart(player, enemy) {
    return ""
  }

  playerContinue(player, enemy) {
    return ""
  }

  enemyContinue(player, enemy) {
    return ""
  }

  climax(player, enemy) {
    return ""
  }
}

/**
 * Position boilerplate for easy copy&paste
 */
/*

class Name extends Position {
  constructor(player, enemy) {
    super(player, [], enemy, [])
    this.name = 'name'
    this.infects = false
  }

  idle (p, e) {
    return ``
  }

  playerStart (p, e) {
    return ``
  }

  enemyStart (p, e) {
    return ``
  }

  playerContinue (p, e) {
    return ``
  }

  enemyContinue (p, e) {
    return ``
  }

  climax (p, e) {
    return ``
  }
}


 */
