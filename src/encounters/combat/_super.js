import "styles/combat.less"

import Chance from "chance"
import G from "grammar/grammar"
import Scene from "scenes/_super"
import { abstract } from "utils/abstract"
import template from "templates/combat.hbs"
const chance = new Chance()

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
      player: this.player,
      enemy: this.enemy,
      hideStats: data.hideStats
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

      { name: "exit", from: ["flee", "endResults"] }
    ]
  }

  // Player choice States
  //---------------------

  //encounter intro text
  intro() {
    this.render({
      text: this.introMessage(this.player, this.enemy),
      hideStats: true,
      responses: [{ state: "main" }]
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

    let actions
    let message
    if (this.fucking) {
      message = this.position.get("idle")
      actions = [
        { text: "keep fucking", state: "fuck" },
        { text: "change position", state: "submit" },
        { text: "struggle", state: "struggle" }
      ]
    } else {
      message = this.mainMessage(this.player, this.enemy)
      actions = [
        { text: "attack", state: "attack" },
        { text: "seduce", state: "seduce" },
        { text: "submit", state: "submit" },
        { text: "examine", state: "examine" },
        { text: "flee", state: "flee" }
      ]
    }

    if (this.player.isStarving) {
      message += `

        **${this.player.you} are severely weakened due to your starvation!**`
    }
    if (this.player.isHungry) {
      message += `

        **${this.player.you} are hungry and weakened.**`
    }

    this.render({
      text: message,
      responses: actions
    })
  }

  //player attacks enemy
  attack() {
    const damage = this.player.attack(this.enemy)
    let bonus = 0

    //up to 50% bonus damage based on how much lust the player has
    if (this.player.perks.has("sadist")) {
      bonus = Math.round(damage * this.player.lustNormalized * 0.5)
      this.enemy.stored.dmg += bonus
    }

    this.render({
      text:
        this.attackMessage(this.player, this.enemy) +
        this.attackResultsMessage(damage + bonus),
      responses: [{ state: "enemyAction" }]
    })
  }

  //examine enemy
  examine() {
    this.render({
      text: this.describeEnemyMessage(this.player, this.enemy),
      responses: [{ text: "back", state: "main" }]
    })
  }

  //player seduces enemy
  seduce() {
    const parts = Object.keys(this.player.parts)
    const responses = []

    parts.forEach(name => {
      const part = this.player[name]

      responses.push({
        state: "seduceResults",
        text: `with ${part.name}`,
        part: name,
        if: part.canSeduce && part.has
      })
    })

    responses.push({ state: "main", text: "back" })

    this.render({
      text: `How do you want to try to seduce ${this.enemy.who}?`,
      responses: responses
    })
  }

  //results of seduction attempt
  seduceResults(data) {
    const damage = this.player.seduce(this.enemy, data.part)

    this.render({
      text:
        this.player[data.part].seductionMessage +
        this.seduceResultsMessage(damage),
      responses: [{ state: "enemyAction" }]
    })
  }

  //player submit options
  submit() {
    const responses = this.availablePositions.map(position => ({
      state: "submitResults",
      text: position.name,
      position: position,
      disabled: position.disabled
    }))

    responses.push({ state: "main", text: "back" })

    this.render({
      text: `What are you offering?`,
      responses: responses
    })
  }

  // player submit attempt results
  submitResults(data) {
    this.consent = true

    if (this.enemy.submit(data.position)) {
      this.fucking = true
      this.position = data.position

      this.render({
        text: this.position.get("player.start"),
        responses: [{ state: "fuck" }]
      })
    } else {
      this.render({
        text: this.notInterestedMessage(this.player, this.enemy),
        responses: [{ state: "enemyAction" }]
      })
    }
  }

  //player fucks enemy
  fuck() {
    const damage = this.player.fuck(
      this.enemy,
      this.position.focus.player,
      this.position.focus.enemy
    )

    this.render({
      text:
        this.position.get("player.continue") +
        this.seduceResultsMessage(damage),
      responses: [{ state: "enemyAction" }]
    })
  }

  //player attempts to struggle free
  struggle() {
    const success = this.player.struggle(this.enemy)

    if (success) {
      this.fucking = false
      this.position = null

      this.render({
        text: this.struggleSuccessMessage(this.player, this.enemy),
        responses: [{ state: "main" }]
      })
    } else {
      this.render({
        text: this.struggleFailureMessage(this.player, this.enemy),
        responses: [{ state: "enemyAction" }]
      })
    }
  }

  // Enemy action states
  //--------------------

  //enemy turn - this is essentially the enemy AI
  enemyAction(data) {
    const enemy = this.enemy
    const wantsToFuck = enemy.wantsToFuck && this.consent

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
    let damage = this.enemy.attack(this.player)
    let lust = 0

    //if the player is a masochist, convert 25% damage to lust
    if (this.player.perks.has("masochist")) {
      lust = Math.ceil(damage * 0.25)
      damage = Math.floor(damage * 0.75)

      this.player.stored.dmg -= lust
      this.player.stored.lust += lust
    }

    this.render({
      text:
        this.playerAttackedMessage(this.player, this.enemy) +
        this.attackedResultsMessage(damage, lust),
      responses: [{ state: "main" }]
    })
  }

  //player gets seduced
  getSeduced() {
    const damage = this.enemy.seduce(this.player)

    this.render({
      text:
        this.seducedMessage(this.player, this.enemy) +
        this.seducedResultsMessage(damage),
      responses: [{ state: "main" }]
    })
  }

  //player is unable to resist
  unableToResist() {
    this.render({
      text: this.player.orgasmed
        ? this.tooHornyMessage(this.player)
        : this.tooWeakMessage(this.player),
      responses: [{ state: "enemyAction" }]
    })
  }

  //enemy attempts to force submit player
  getForceSubmitted() {
    const position =
      this.enemy.grapple(this.player) && this.enemyChoosePosition()

    if (position) {
      this.fucking = true
      this.position = position

      this.render({
        text: this.position.get("enemy.start"),
        responses: [{ state: "enemyAction", initiated: true }]
      })
    } else {
      this.render({
        text: this.grappleFailureMessage(this.player, this.enemy),
        responses: [{ state: "main" }]
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
        responses: [{ state: "enemyAction" }]
      })
    } else {
      const enemy = this.enemy
      const damage = enemy.fuck(
        this.player,
        this.position.focus.enemy,
        this.position.focus.player
      )

      this.render({
        text:
          this.position.get("enemy.continue") +
          this.seducedResultsMessage(damage),
        responses: [{ state: "main" }]
      })
    }
  }

  // Encounter end states
  //---------------------

  //player attempts to flee
  flee() {
    const success = this.player.flee(this.enemy)

    if (success) {
      this.render({
        text: this.fleeSuccessMessage(this.player, this.enemy),
        responses: [{ state: "exit" }]
      })
    } else {
      this.render({
        text: this.fleeFailureMessage(this.player, this.enemy),
        responses: [{ state: "enemyAction" }]
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
          text: this.pullOutMessage(this.player, this.enemy),
          responses: [
            { text: "pull out", state: "pullOut" },
            { text: "keep going", state: "climax" }
          ]
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
        text: this.struggleSuccessMessage(this.player, this.enemy),
        responses: [{ state: "climax" }]
      })
    } else {
      this.render({
        text: this.struggleFailureMessage(this.player, this.enemy),
        responses: [{ state: "climax" }]
      })
    }
  }

  //climax
  climax() {
    const message = this.fucking
      ? this.position.get("climax")
      : this.climaxMessage(this.player, this.enemy)

    this.render({
      text: message,
      responses: [{ state: "endResults" }]
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
      const playerPart = this.player.getPart(this.position.focus.player)
      const dilation = this.enemy.getDiameter(this.position.focus.enemy) || 0

      if (typeof playerPart.dilate === "function") {
        dilationMessage = playerPart.dilate(dilation) || ""
      }
    }

    //infection
    if (this.fucking && this.fucking.infects) {
      const transformation = this.enemy.infect(this.player)

      if (transformation) {
        infectionMessage = `
          ${this.infectionMessage(this.player, this.enemy)}

          ${transformation}`
      }
    }

    //message
    if (this.player.orgasmed) {
      resultMessage = this.climaxLossMessage(this.player, this.enemy)
    } else if (this.enemy.orgasmed) {
      resultMessage = this.climaxVictoryMessage(this.player, this.enemy)
    } else if (!this.player.alive) {
      resultMessage = this.combatLossMessage(this.player, this.enemy)
    } else {
      resultMessage = this.combatVictoryMessage(this.player, this.enemy)
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
      responses: [{ state: "exit" }]
    })
  }

  //go back to main scene
  exit() {
    this.game.world.advance()

    if (this.fadeout) {
      this.fade().then(() => this.game.setScene("main"))
    } else {
      this.game.setScene("main")
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

  attackResultsMessage(damage) {
    return `

    You deal **${damage} damage**`
  }

  attackedResultsMessage(damage, lust) {
    let text = `

      You suffer **${damage} damage**`

    if (lust) {
      text += `, it feels good — you gain **${lust} lust**`
    }

    return text
  }

  seduceResultsMessage(lust) {
    return `

      [foe] gains **${lust} lust**`
  }

  seducedResultsMessage(lust) {
    return `

      You gain **${lust} lust**`
  }

  tooHornyMessage(p) {
    return `

      [you] are overwhelmed with lust and unable to control your actions.`
  }

  tooWeakMessage(p) {
    return `

      [you] have lost all strength in [your.body] and are unable to resist.`
  }

  gainMessage(xp, item) {
    let text = `

      Gained **${xp}xp**`

    if (item) {
      text += ` and found **${item.name}**`
    }

    return text
  }

  attackMessage(p, e) {
    return `

      [you] swing [your.weapon] at [foe].`
  }

  fleeSuccessMessage(p, e) {
    return `
      [you] manage to run away from [foe]!`
  }

  fleeFailureMessage(p, e) {
    return `
      [you] try to flee but [foe]~>stop you in your tracks!`
  }

  // Messages - extend these with encounter specific messages
  //---------------------------------------------------------

  introMessage(p, e) {
    return ""
  }

  mainMessage(p, e) {
    return ""
  }

  describeEnemyMessage(p, e) {
    return ""
  }

  playerAttackedMessage(p, e) {
    return ""
  }

  combatLossMessage(p, e) {
    return ""
  }

  combatVictoryMessage(p, e) {
    return ""
  }

  climaxLossMessage(p, e) {
    return ""
  }

  climaxVictoryMessage(p, e) {
    return ""
  }

  infectionMessage(p, e) {
    return ""
  }

  pullOutMessage(p, e) {
    return ""
  }

  struggleSuccessMessage(p, e) {
    return ""
  }

  struggleFailureMessage(p, e) {
    return ""
  }

  seducedMessage(p, e) {
    return ""
  }

  notInterestedMessage(p, e) {
    return ""
  }

  grappleFailureMessage(p, e) {
    return ""
  }

  climaxMessage(p, e) {
    return ""
  }

  // Debugging
  //----------

  /** output all static text strings */
  get debugStatic() {
    const p = this.player
    const e = this.enemy
    return G.trim(`
      ${G.clean(this.attackResultsMessage(10))}
      ${G.clean(this.attackedResultsMessage(10))}
      ${G.clean(this.attackedResultsMessage(10, 10))}
      ${G.clean(this.seduceResultsMessage(10))}
      ${G.clean(this.seducedResultsMessage(10))}
      ${G.clean(this.tooHornyMessage(p, e))}
      ${G.clean(this.tooWeakMessage(p, e))}
      ${G.clean(this.gainMessage(10))}
      ${G.clean(this.gainMessage(10, { name: "Dummy" }))}
      ${G.clean(this.attackMessage(p, e))}
      ${G.clean(this.fleeSuccessMessage(p, e))}
      ${G.clean(this.fleeFailureMessage(p, e))}
    `)
  }

  get debugExtended() {
    const p = this.player
    const e = this.enemy
    return G.trim(`
      ${G.clean(this.introMessage(p, e))}
      ${G.clean(this.mainMessage(p, e))}
      ${G.clean(this.describeEnemyMessage(p, e))}
      ${G.clean(this.playerAttackedMessage(p, e))}
      ${G.clean(this.combatLossMessage(p, e))}
      ${G.clean(this.combatVictoryMessage(e, p))}
      ${G.clean(this.climaxLossMessage(p, e))}
      ${G.clean(this.climaxVictoryMessage(p, e))}
      ${G.clean(this.infectionMessage(p, e))}
      ${G.clean(this.seducedMessage(p, e))}
      ${G.clean(this.pullOutMessage(p, e))}
      ${G.clean(this.struggleSuccessMessage(p, e))}
      ${G.clean(this.struggleFailureMessage(p, e))}
      ${G.clean(this.grappleFailureMessage(p, e))}
      ${G.clean(this.notInterestedMessage(p, e))}
      ${G.clean(this.climaxMessage(p, e))}
    `)
  }

  /** output dynamic strings */
  // TODO - work with new position system
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
