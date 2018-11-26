import "styles/combat.less"

import { lib, combine } from "library/library"
import { Position } from "../position"
import { chance } from "utils/chance"
import Scene from "scenes/_super"
import template from "templates/combat.hbs"

import {
  Attack,
  Flee,
  Fuck,
  Grapple,
  Interested,
  Seduce,
  Struggle,
} from "mechanics/formulas"

/**
 * CombatEncounter
 * This is the base class from which all combat encounters must inherit from
 * refer to README.md for instructions on how to make custom encounters
 */
export default class CombatEncounter extends Scene {
  constructor(game, enemy, config) {
    super(game)

    this.prefix = config.prefix

    this.enemy = enemy
    this.player = game.player

    this.fucking = false
    this.position = null
    this.consent = false

    this.positions = []
    config.positions.forEach(config => this.addPosition(config))

    this.state.intro()
  }

  //render combat
  render(data) {
    data.static = template({
      difficulty: this.enemy.difficulty,
      player: this.player,
      enemy: this.enemy,
      hideEnemyNumbers: this.player.perception < this.enemy.perception / 2,
      hideStats: data.hideStats,
    })

    data.classes = "combat"

    super.render(data)
  }

  // States & transitions
  //---------------------

  get FSMStates() {
    return [
      { name: "intro", from: "none" },

      { name: "main", from: "*" },

      { name: "attack", from: "main" },
      { name: "inventory", from: "main" },
      { name: "seduce", from: "main" },
      { name: "submit", from: "main" },
      { name: "flee", from: "main" },
      { name: "struggle", from: "main" },
      { name: "examine", from: "main" },
      { name: "fuck", from: ["main", "submitResults"] },

      { name: "submitResults", from: ["main", "submit"] },
      { name: "seduceResults", from: "seduce" },
      { name: "unableToResist", from: "main" },

      { name: "enemyAction", from: "*" },
      { name: "getForceSubmitted", from: "enemyAction" },
      { name: "getHit", from: "enemyAction" },
      { name: "getSeduced", from: "enemyAction" },
      { name: "getFucked", from: "enemyAction" },

      { name: "end", from: ["main", "enemyAction"] },
      { name: "pullOut", from: "end" },
      { name: "climax", from: ["end", "pullOut"] },
      { name: "endResults", from: ["end", "climax"] },

      { name: "exit", from: ["flee", "endResults"] },
    ]
  }

  // Player choice States
  //---------------------

  //encounter intro text
  intro() {
    this.render({
      text: lib(this, "INTRO"),
      hideStats: true,
      responses: [{ state: "main" }],
    })
  }

  //main screen & player actions
  main() {
    if (!this.enemy.alive || this.enemy.orgasmed) {
      return this.state.end()
    }

    if (!this.player.alive || this.player.orgasmed) {
      return this.state.unableToResist()
    }

    let attackLabel = "attack"
    let fleeLabel = "flee"
    let struggleLabel = "struggle"
    if (this.player.perception > this.enemy.perception * 2) {
      let formula = new Attack(this.player, this.enemy)
      attackLabel += formula.toString()

      formula = new Flee(this.player, this.enemy)
      fleeLabel += formula.toString()

      formula = new Struggle(this.player, this.enemy)
      struggleLabel += formula.toString()
    }

    let actions
    let message
    if (this.fucking) {
      message = lib(this.position, "IDLE")
      actions = [
        { text: "keep fucking", state: "fuck" },
        { text: "change position", state: "submit" },
        { text: struggleLabel, state: "struggle" },
      ]
    } else {
      message = lib(this, "MAIN")
      actions = [
        { text: attackLabel, state: "attack" },
        { text: "seduce", state: "seduce" },
        { text: "submit", state: "submit" },
        { text: "examine", state: "examine" },
        { text: fleeLabel, state: "flee" },
      ]
    }

    // disabled for now... need to make a decision on whether the player can use items during combat
    // actions.push({
    //   text: 'inventory', state: 'inventory'
    // })

    this.render({
      text: message,
      responses: actions,
    })
  }

  async inventory() {
    await this.game.subScene("inventory")
    this.state.main()
  }

  //player attacks enemy
  attack() {
    const formula = new Attack(this.player, this.enemy)
    const amount = formula.roll()

    this.enemy.damage(amount)

    this.render({
      text: lib("COMBAT_ATTACK"),
      responses: [{ state: "enemyAction" }],
    })
  }

  //examine enemy
  examine() {
    let text = lib(this, "DESCRIBE_FOE")

    if (this.player.perception > this.enemy.perception) {
      text = combine(text, this.inspectStats())
    }

    this.render({
      text: text,
      responses: [{ text: "back", state: "main" }],
    })
  }

  //player seduces enemy
  seduce() {
    const parts = Object.keys(this.player.parts)
    const responses = []

    parts.forEach(name => {
      const part = this.player[name]
      let label = `with ${part.name}`

      if (this.player.perception > this.enemy.perception * 2) {
        const formula = new Seduce(part, this.enemy)
        label += formula.toString()
      }

      responses.push({
        state: "seduceResults",
        text: label,
        part: name,
        if: part.canSeduce && part.has,
      })
    })

    responses.push({ state: "main", text: "back" })

    this.render({
      text: lib("COMBAT_CHOOSE_SEDUCTION"),
      responses: responses,
    })
  }

  //results of seduction attempt
  seduceResults(data) {
    const formula = new Seduce(this.player[data.part], this.enemy)
    const amount = formula.roll()

    this.enemy.arouse(amount)

    const message = this.player[data.part].seductionMessage

    this.render({
      text: combine(message, lib("COMBAT_SEDUCE")),
      responses: [{ state: "enemyAction" }],
    })
  }

  //player submit options
  submit() {
    const responses = this.availablePositions.map(position => ({
      state: "submitResults",
      text: position.name,
      position: position,
      disabled: position.disabled,
    }))

    responses.push({ state: "main", text: "back" })

    this.render({
      text: lib("COMBAT_CHOOSE_SUBMIT"),
      responses: responses,
    })
  }

  // player submit attempt results
  submitResults(data) {
    this.consent = true

    const accepted =
      this.enemy.lustNormalized *
        this.enemy.likes(data.position.focus.player) *
        data.position.focus.enemy.sensitivity >
      0.2

    if (accepted) {
      this.fucking = true
      this.position = data.position

      this.render({
        text: lib(this.position, "PLAYER_START"),
        responses: [{ state: "fuck" }],
      })
    } else {
      this.render({
        text: lib(this, "NOT_INTERESTED"),
        responses: [{ state: "enemyAction" }],
      })
    }
  }

  //player fucks enemy
  fuck() {
    const formula = new Fuck(
      this.position.focus.player,
      this.position.focus.enemy
    )

    const amount = formula.roll()

    this.enemy.arouse(amount)

    this.render({
      text: combine(
        lib(this.position, "PLAYER_CONTINUE"),
        lib("COMBAT_SEDUCE")
      ),
      responses: [{ state: "enemyAction" }],
    })
  }

  //player attempts to struggle free
  struggle() {
    const formula = new Struggle(this.player, this.enemy)
    const success = formula.roll()

    if (success) {
      this.fucking = false
      this.position = null

      this.render({
        text: lib(this, "STRUGGLE_SUCCESS"),
        responses: [{ state: "main" }],
      })
    } else {
      this.render({
        text: lib(this, "STRUGGLE_FAILURE"),
        responses: [{ state: "enemyAction" }],
      })
    }
  }

  // Enemy action states
  //--------------------

  //enemy turn - this is essentially the enemy AI
  enemyAction(data) {
    const enemy = this.enemy
    const formula = new Interested(enemy)
    const wantsToFuck = formula.roll() && this.consent

    if (this.enemy.orgasmed || !this.enemy.alive) {
      return this.state.end()
    }

    //player unable to resist, the enemy can have their way with them
    if (!this.player.alive || this.player.orgasmed) {
      if (this.fucking) {
        enemy.stored.lust = enemy.lustMax
        return this.state.end()
      } else if (wantsToFuck) {
        return this.state.getForceSubmitted()
      } else {
        return this.state.end()
      }
    }

    // keep fucking
    if (this.fucking) {
      return this.state.getFucked(data.initiated)

      // try to start fucking
    } else if (wantsToFuck) {
      return this.state.getForceSubmitted()

      // seduce player
    } else if (chance.random() < enemy.lustNormalized) {
      return this.state.getSeduced()

      // attack player
    } else {
      return this.state.getHit()
    }
  }

  //player gets hit
  getHit() {
    const formula = new Attack(this.enemy, this.player)
    const amount = formula.roll()

    this.player.damage(amount)

    this.render({
      text: combine(lib(this, "PLAYER_ATTACKED"), lib("COMBAT_ATTACKED")),
      responses: [{ state: "main" }],
    })
  }

  //player gets seduced
  getSeduced() {
    const formula = new Seduce(this.enemy.body, this.player)
    const amount = formula.roll()

    this.player.arouse(amount)

    this.render({
      text: combine(lib(this, "SEDUCED"), lib("LUST_GAIN")),
      responses: [{ state: "main" }],
    })
  }

  //player is unable to resist
  unableToResist() {
    this.render({
      text: this.player.orgasmed
        ? lib("COMBAT_TOO_HORNY")
        : lib("COMBAT_TOO_WEAK"),
      responses: [{ state: "enemyAction" }],
    })
  }

  //enemy attempts to force submit player
  getForceSubmitted() {
    const formula = new Grapple(this.enemy, this.player)
    const success = formula.roll()

    const position = success && this.enemyChoosePosition()

    if (position) {
      this.fucking = true
      this.position = position

      this.render({
        text: lib(this.position, "ENEMY_START"),
        responses: [{ state: "enemyAction", initiated: true }],
      })
    } else {
      this.render({
        text: lib(this, "GRAPPLE_FAILURE"),
        responses: [{ state: "main" }],
      })
    }
  }

  //enemy fucks player
  getFucked(initiated) {
    //the opponent can try to change position to one it prefers (if a position wasn't just initiated)
    const position = this.enemyChoosePosition()
    if (
      !initiated &&
      this.enemy.likes(position.focus.player) >
        this.enemy.likes(this.position.focus.player)
    ) {
      this.fucking = true
      this.position = position

      this.render({
        text: lib(this.position, "ENEMY_START"),
        responses: [{ state: "enemyAction" }],
      })
    } else {
      const formula = new Fuck(
        this.position.focus.enemy,
        this.position.focus.player
      )

      const amount = formula.roll()

      this.player.arouse(amount)

      this.render({
        text: combine(lib(this.position, "ENEMY_CONTINUE"), lib("LUST_GAIN")),
        responses: [{ state: "main" }],
      })
    }
  }

  // Encounter end states
  //---------------------

  // player attempts to flee
  flee() {
    const formula = new Flee(this.player, this.enemy)
    const success = formula.roll()

    if (success) {
      this.render({
        text: lib("COMBAT_FLEE_SUCCESS"),
        responses: [{ state: "exit" }],
      })
    } else {
      this.render({
        text: lib("COMBAT_FLEE_FAILURE"),
        responses: [{ state: "enemyAction" }],
      })
    }
  }

  //encounter is about to end
  end() {
    if (this.fucking) {
      if (this.player.orgasmed) {
        return this.state.climax()
      } else {
        this.render({
          text: lib(this, "PULL_OUT"),
          responses: [
            { text: "pull out", state: "pullOut" },
            { text: "keep going", state: "climax" },
          ],
        })
      }
    } else if (this.enemy.orgasmed) {
      return this.state.climax()
    } else {
      return this.state.endResults()
    }
  }

  //player attempts to pull out
  pullOut() {
    const success = this.player.struggle(this.enemy)

    if (success) {
      this.fucking = false
      this.position = null

      this.render({
        text: lib(this, "STRUGGLE_SUCCESS"),
        responses: [{ state: "climax" }],
      })
    } else {
      this.render({
        text: lib(this, "STRUGGLE_FAILURE"),
        responses: [{ state: "climax" }],
      })
    }
  }

  //climax
  climax() {
    this.render({
      text: lib(this.fucking ? this.position : this, "CLIMAX"),
      responses: [{ state: "endResults" }],
    })
  }

  //combat results, exp, loot, etc...
  endResults() {
    let XPmessage = ""
    let ItemMessage = ""
    let dilationMessage = ""
    let infectionMessage = ""
    let resultMessage = ""
    let passOutMessage = ""

    //experience gain
    if (!this.player.orgasmed && this.player.alive) {
      const xp = this.enemy.XPWorth
      this.player.giveXP(xp)

      let item
      if (this.enemy.loot) {
        item = this.player.inventory.loot(this.enemy.loot)
        this.game.scene.item = item
        ItemMessage = lib("ITEM_PICKUP")
      }

      // TODO: fix this
      XPmessage = lib("XP_GAIN")
    }

    //dilation
    if (this.fucking) {
      const playerPart = this.position.focus.player
      const dilation = this.position.focus.enemy.diameter || 0

      if (typeof playerPart.dilate === "function") {
        dilationMessage = playerPart.dilate(dilation) || ""
      }
    }

    //infection
    if (this.fucking && this.position.infects) {
      const transformation = this.enemy.infect(this.player)

      if (transformation) {
        infectionMessage = combine(lib(this, "INFECT"), transformation)
      }
    }

    //message
    if (this.player.orgasmed) {
      resultMessage = lib(this, "CLIMAX_LOSS")
    } else if (this.enemy.orgasmed) {
      resultMessage = lib(this, "CLIMAX_VICTORY")
    } else if (!this.player.alive) {
      resultMessage = lib(this, "COMBAT_LOSS")
    } else {
      resultMessage = lib(this, "COMBAT_VICTORY")
    }

    if (this.player.orgasmed || !this.player.alive) {
      this.fadeout = true
      passOutMessage = lib("COMBAT_PASSED_OUT")
    }

    if (this.player.orgasmed) {
      this.player.soothe(999999)
    }

    this.render({
      text: combine(
        XPmessage,
        ItemMessage,
        dilationMessage,
        infectionMessage,
        resultMessage,
        passOutMessage
      ),
      hideStats: true,
      responses: [{ state: "exit" }],
    })
  }

  //go back to main scene
  exit() {
    this.game.world.advance()

    if (this.fadeout) {
      this.fade().then(() => super.end())
    } else {
      super.end()
    }
  }

  // Enemy choices
  //--------------

  // add a position to this encounter
  addPosition(config) {
    this.positions.push(new Position(this.player, this.enemy, config))
  }

  get availablePositions() {
    return this.positions.filter(position => position.available)
  }

  enemyChoosePosition() {
    const choices = this.availablePositions.filter(
      position => !position.disabled
    )
    const weights = choices.map(position =>
      this.enemy.likes(position.focus.player)
    )

    if (!choices.length) {
      return false
    } else {
      return chance.weighted(choices, weights)
    }
  }

  // Helper messages
  //----------------

  inspectStats() {
    const e = this.enemy

    return `
      STR:${e.strength} | STAM:${e.stamina} | CHAR:${e.charisma} |
      WILL:${e.willpower} | DEX:${e.dexterity}`
  }
}
