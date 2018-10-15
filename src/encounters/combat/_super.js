import "styles/combat.less"

import Chance from "chance"
import G from "grammar/grammar"
import Scene from "scenes/_super"
import { abstract } from "utils/abstract"
import template from "templates/combat.hbs"
const chance = new Chance()

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
  constructor(game, enemy) {
    super(game)

    abstract(
      this,
      "introMessage",
      "mainMessage",
      "describeEnemyMessage",
      "playerAttackedMessage",
      "combatLossMessage",
      "combatVictoryMessage",
      "climaxLossMessage",
      "climaxVictoryMessage",
      "infectionMessage",
      "pullOutMessage",
      "struggleSuccessMessage",
      "struggleFailureMessage",
      "seducedMessage",
      "notInterestedMessage",
      "grappleFailureMessage",
      "climaxMessage"
    )

    this.player = game.player
    this.enemy = enemy

    this.fucking = false
    this.position = null

    this.consent = false

    this.positions = []

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
      text: this.introMessage(),
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
      attackLabel += ` (${formula.min}-${formula.max})`

      formula = new Flee(this.player, this.enemy)
      fleeLabel += ` (${formula.chance})`

      formula = new Struggle(this.player, this.enemy)
      struggleLabel += ` (${formula.chance})`
    }

    let actions
    let message
    if (this.fucking) {
      message = this.position.get("idle")
      actions = [
        { text: "keep fucking", state: "fuck" },
        { text: "change position", state: "submit" },
        { text: struggleLabel, state: "struggle" },
      ]
    } else {
      message = this.mainMessage()
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
      text: this.attackMessage() + this.attackResultsMessage(),
      responses: [{ state: "enemyAction" }],
    })
  }

  //examine enemy
  examine() {
    let text = this.describeEnemyMessage()

    if (this.player.perception > this.enemy.perception) {
      text += `

        ${this.inspectStats()}`
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
        label += ` (${formula.min}-${formula.max})`
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
      text: `How do you want to try to seduce [foe]?`,
      responses: responses,
    })
  }

  //results of seduction attempt
  seduceResults(data) {
    const formula = new Seduce(this.player[data.part], this.enemy)
    const amount = formula.roll()

    this.enemy.arouse(amount)

    this.render({
      text:
        this.player[data.part].seductionMessage + this.seduceResultsMessage(),
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
      text: `What are you offering?`,
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
        text: this.position.get("player.start"),
        responses: [{ state: "fuck" }],
      })
    } else {
      this.render({
        text: this.notInterestedMessage(),
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
      text: this.position.get("player.continue") + this.seduceResultsMessage(),
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
        text: this.struggleSuccessMessage(),
        responses: [{ state: "main" }],
      })
    } else {
      this.render({
        text: this.struggleFailureMessage(),
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
    } else if (Math.random() < enemy.lustNormalized) {
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
      text: this.playerAttackedMessage() + this.attackedResultsMessage(),
      responses: [{ state: "main" }],
    })
  }

  //player gets seduced
  getSeduced() {
    const formula = new Seduce(this.enemy.body, this.player)
    const amount = formula.roll()

    this.player.arouse(amount)

    this.render({
      text: this.seducedMessage() + this.seducedResultsMessage(),
      responses: [{ state: "main" }],
    })
  }

  //player is unable to resist
  unableToResist() {
    this.render({
      text: this.player.orgasmed
        ? this.tooHornyMessage()
        : this.tooWeakMessage(),
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
        text: this.position.get("enemy.start"),
        responses: [{ state: "enemyAction", initiated: true }],
      })
    } else {
      this.render({
        text: this.grappleFailureMessage(),
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
        text: this.position.get("enemy.start"),
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
        text:
          this.position.get("enemy.continue") + this.seducedResultsMessage(),
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
        text: this.fleeSuccessMessage(),
        responses: [{ state: "exit" }],
      })
    } else {
      this.render({
        text: this.fleeFailureMessage(),
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
          text: this.pullOutMessage(),
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
        text: this.struggleSuccessMessage(),
        responses: [{ state: "climax" }],
      })
    } else {
      this.render({
        text: this.struggleFailureMessage(),
        responses: [{ state: "climax" }],
      })
    }
  }

  //climax
  climax() {
    const message = this.fucking
      ? this.position.get("climax")
      : this.climaxMessage()

    this.render({
      text: message,
      responses: [{ state: "endResults" }],
    })
  }

  //combat results, exp, loot, etc...
  endResults() {
    let XPmessage = ""
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
      }

      XPmessage = this.gainMessage(xp, item)
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
        infectionMessage = `
          ${this.infectionMessage()}

          ${transformation}`
      }
    }

    //message
    if (this.player.orgasmed) {
      resultMessage = this.climaxLossMessage()
    } else if (this.enemy.orgasmed) {
      resultMessage = this.climaxVictoryMessage()
    } else if (!this.player.alive) {
      resultMessage = this.combatLossMessage()
    } else {
      resultMessage = this.combatVictoryMessage()
    }

    if (this.player.orgasmed || !this.player.alive) {
      this.fadeout = true
      passOutMessage = `
        Time passes before [you] regain your senses.`
    }

    if (this.player.orgasmed) {
      this.player.soothe(999999)
    }

    const text = `
      ${XPmessage}

      ${dilationMessage}

      ${infectionMessage}

      ${resultMessage}

      ${passOutMessage}`

    this.render({
      text: text,
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
  addPosition(Position) {
    this.positions.push(new Position(this.player, this.enemy))
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

  attackResultsMessage() {
    return `

      You deal **[damage(foe)]**`
  }

  attackedResultsMessage() {
    return `

      You suffer **[damage(you)]**`
  }

  seduceResultsMessage() {
    return `

      [foe] gains **[lust(foe)]**`
  }

  seducedResultsMessage() {
    return `

      You gain **[lust(you)]**`
  }

  tooHornyMessage() {
    return `

      [you] are overwhelmed with lust and unable to control your actions.`
  }

  tooWeakMessage() {
    return `

      [you] have lost all strength in [your:body] and are unable to resist.`
  }

  gainMessage(xp, item) {
    let text = `

      Gained **[xp]**`

    if (item) {
      this.game.scene.item = item

      text += ` and found **[item]**`
    }

    return text
  }

  attackMessage() {
    return `

      [you] swing [your.weapon] at [foe].`
  }

  fleeSuccessMessage() {
    return `
      [you] manage to run away from [foe]!`
  }

  fleeFailureMessage() {
    return `
      [you] try to flee but [foe]~>stop you in your tracks!`
  }

  inspectStats() {
    const e = this.enemy

    return `
      STR:${e.strength} | STAM:${e.stamina} | CHAR:${e.charisma} |
      WILL:${e.willpower} | DEX:${e.dexterity}`
  }

  // Messages - extend these with encounter specific messages
  //---------------------------------------------------------

  introMessage() {
    return ""
  }

  mainMessage() {
    return ""
  }

  describeEnemyMessage() {
    return ""
  }

  playerAttackedMessage() {
    return ""
  }

  combatLossMessage() {
    return ""
  }

  combatVictoryMessage() {
    return ""
  }

  climaxLossMessage() {
    return ""
  }

  climaxVictoryMessage() {
    return ""
  }

  infectionMessage() {
    return ""
  }

  pullOutMessage() {
    return ""
  }

  struggleSuccessMessage() {
    return ""
  }

  struggleFailureMessage() {
    return ""
  }

  seducedMessage() {
    return ""
  }

  notInterestedMessage() {
    return ""
  }

  grappleFailureMessage() {
    return ""
  }

  climaxMessage() {
    return ""
  }

  // Debugging
  //----------

  /** output all static text strings */
  get debugStatic() {
    return G.trim(`
      ${G.clean(this.attackResultsMessage())}
      ${G.clean(this.attackedResultsMessage())}
      ${G.clean(this.attackedResultsMessage())}
      ${G.clean(this.seduceResultsMessage())}
      ${G.clean(this.seducedResultsMessage())}
      ${G.clean(this.tooHornyMessage())}
      ${G.clean(this.tooWeakMessage())}
      ${G.clean(this.gainMessage(10))}
      ${G.clean(this.gainMessage(10, { name: "Dummy" }))}
      ${G.clean(this.attackMessage())}
      ${G.clean(this.fleeSuccessMessage())}
      ${G.clean(this.fleeFailureMessage())}
    `)
  }

  get debugExtended() {
    return G.trim(`
      ${G.clean(this.introMessage())}
      ${G.clean(this.mainMessage())}
      ${G.clean(this.describeEnemyMessage())}
      ${G.clean(this.playerAttackedMessage())}
      ${G.clean(this.combatLossMessage())}
      ${G.clean(this.combatVictoryMessage())}
      ${G.clean(this.climaxLossMessage())}
      ${G.clean(this.climaxVictoryMessage())}
      ${G.clean(this.infectionMessage())}
      ${G.clean(this.seducedMessage())}
      ${G.clean(this.pullOutMessage())}
      ${G.clean(this.struggleSuccessMessage())}
      ${G.clean(this.struggleFailureMessage())}
      ${G.clean(this.grappleFailureMessage())}
      ${G.clean(this.notInterestedMessage())}
      ${G.clean(this.climaxMessage())}
    `)
  }

  /** output dynamic strings */
  get debugDynamic() {
    return G.trim(
      this.positions
        .map(
          p => `
        ## ${p.name} ##
        ${G.clean(p.get("idle"))}
        ${G.clean(p.get("player.start"))}
        ${G.clean(p.get("enemy.start"))}
        ${G.clean(p.get("player.continue"))}
        ${G.clean(p.get("enemy.continue"))}
        ${G.clean(p.get("climax"))}
      `
        )
        .join("")
    )
  }

  get debug() {
    return G.trim(`
      ${this.debugStatic}
      ${this.debugExtended}
      ${this.debugDynamic}
    `)
  }
}
