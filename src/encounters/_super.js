import Chance from "chance"
import CombatState from "states/combat"
import Grammar from "utils/grammar"
const chance = new Chance()

/**
 * DefaultEncounter
 * This is the base class from which all encounters must inherit from
 * refer to README.md for instructions on how to make custom encounters
 */
export default class DefaultEncounter extends CombatState {
  constructor(game, enemy) {
    super(game)

    this.player = game.player
    this.enemy = enemy

    this.fucking = false

    this.state.intro()
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
      text: this.introMessage,
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

    const totalSub = this.player.perks.has("total sub")

    let actions
    if (this.fucking) {
      actions = [
        { text: "keep fucking", state: "fuck" },
        { text: "change position", state: "submit", if: !totalSub },
        { text: "struggle", state: "struggle", if: !totalSub }
      ]
    } else {
      actions = [
        { text: "attack", state: "attack" },
        { text: "seduce", state: "seduce" },
        { text: "submit", state: "submit", if: !totalSub },
        { text: "submit", state: "submitResults", if: totalSub },
        { text: "examine", state: "examine" },
        { text: "flee", state: "flee" }
      ]
    }

    let starvationMessage = ""
    if (this.player.isStarving) {
      starvationMessage = `<p><b>You are severely weakened due to your starvation!</b></p>`
    }
    if (this.player.isHungry) {
      starvationMessage = `<p><b>You are hungry and weakened.</b></p>`
    }

    this.render({
      text: this.mainMessage + starvationMessage,
      responses: actions
    })
  }

  //player attacks enemy
  attack() {
    const damage = this.player.attack(this.enemy)
    let bonus = 0

    //up to 50% bonus damage based on how much lust the player has
    if (this.player.perks.has("sadist")) {
      bonus = Math.round(damage * this.player.normalizedLust * 0.5)
      this.enemy.stats.dmg += bonus
    }

    this.render({
      text: this.attackMessage + this.attackResultsMessage(damage + bonus),
      responses: [{ state: "enemyAction" }]
    })
  }

  //examine enemy
  examine() {
    this.render({
      text: this.describeEnemyMessage,
      responses: [{ text: "back", state: "main" }]
    })
  }

  //player seduces enemy
  seduce() {
    const parts = Object.keys(this.player.parts)
    const responses = []

    parts.forEach(name => {
      const part = this.player.parts[name]

      responses.push({
        state: "seduceResults",
        text: `with ${part.your}`,
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
        this.player.parts[data.part].seductionMessage +
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

  //player submit attempt results
  submitResults(data) {
    const totalSub = this.player.perks.has("total sub")
    let success

    if (totalSub) {
      //total sub, submitting always possible but enemy chooses position
      success = true
      data.position = this.enemyChoosePosition()
    } else if (this.player.perks.has("subbie")) {
      //to attempts if the player has this perk
      success =
        this.enemy.submit(data.position) || this.enemy.submit(data.position)
    } else {
      success = this.enemy.submit(data.position)
    }

    if (success) {
      this.fucking = data.position

      this.render({
        text: totalSub
          ? this.enemyInitiatePositionMessage
          : this.playerInitiatePositionMessage,
        responses: [{ state: "fuck" }]
      })
    } else {
      this.render({
        text: this.notInterestedMessage,
        responses: [{ state: "enemyAction" }]
      })
    }
  }

  //player fucks enemy
  fuck() {
    const damage = this.player.fuck(
      this.enemy,
      this.fucking.player,
      this.fucking.enemy
    )

    this.render({
      text:
        this.playerContinuePositionMessage + this.seduceResultsMessage(damage),
      responses: [{ state: "enemyAction" }]
    })
  }

  //player attempts to struggle free
  struggle() {
    const success = this.player.struggle(this.enemy)

    if (success) {
      this.fucking = false

      this.render({
        text: this.struggleSuccessMessage,
        responses: [{ state: "main" }]
      })
    } else {
      this.render({
        text: this.struggleFailureMessage,
        responses: [{ state: "enemyAction" }]
      })
    }
  }

  // Enemy action states
  //--------------------

  //enemy turn - this is essentially the enemy AI
  enemyAction(data) {
    const enemy = this.enemy
    const wantsToFuck = enemy.wantsToFuck

    if (this.enemy.orgasmed || !this.enemy.alive) {
      return this.state.end()
    }

    //player unable to resist, the enemy can have their way with them
    if (!this.player.alive || this.player.orgasmed) {
      if (this.fucking) {
        enemy.stats.lust = enemy.maxLust
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
    } else if (Math.random() < enemy.normalizedLust) {
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

      this.player.stats.dmg -= lust
      this.player.stats.lust += lust
    }

    this.render({
      text:
        this.playerAttackdeMessage + this.attackedResultsMessage(damage, lust),
      responses: [{ state: "main" }]
    })
  }

  //player gets seduced
  getSeduced() {
    const damage = this.enemy.seduce(this.player)

    this.render({
      text: this.seducedMessage + this.seducedResultsMessage(damage),
      responses: [{ state: "main" }]
    })
  }

  //player is unable to resist
  unableToResist() {
    this.render({
      text: this.player.orgasmed ? this.tooHornyMessage : this.tooWeakMessage,
      responses: [{ state: "enemyAction" }]
    })
  }

  //enemy attempts to force submit player
  getForceSubmitted() {
    const position =
      this.enemy.grapple(this.player) && this.enemyChoosePosition()

    if (position) {
      this.fucking = position

      this.render({
        text: this.enemyInitiatePositionMessage,
        responses: [{ state: "enemyAction", initiated: true }]
      })
    } else {
      this.render({
        text: this.grappleFailureMessage,
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
      this.enemy.likes(position.player) > this.enemy.likes(this.fucking.player)
    ) {
      this.fucking = position

      this.render({
        text: this.enemyInitiatePositionMessage,
        responses: [{ state: "enemyAction" }]
      })
    } else {
      const enemy = this.enemy
      const damage = enemy.fuck(
        this.player,
        this.fucking.enemy,
        this.fucking.player
      )

      this.render({
        text:
          this.enemyContinuePositionMessage +
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
        text: this.fleeSuccessMessage,
        responses: [{ state: "exit" }]
      })
    } else {
      this.render({
        text: this.fleeFailureMessage,
        responses: [{ state: "enemyAction" }]
      })
    }
  }

  //encounter is about to end
  end() {
    if (this.fucking) {
      if (this.player.orgasmed || this.player.perks.has("total sub")) {
        return this.state.climax()
      } else {
        this.render({
          text: this.pullOutMessage,
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

      this.render({
        text: this.struggleSuccessMessage,
        responses: [{ state: "climax" }]
      })
    } else {
      this.render({
        text: this.struggleFailureMessage,
        responses: [{ state: "climax" }]
      })
    }
  }

  //climax
  climax() {
    this.render({
      text: this.climaxMessage,
      responses: [{ state: "endResults" }]
    })
  }

  //combat results, exp, loot, etc...
  endResults() {
    let text = ""

    //experience gain
    if (!this.player.orgasmed && this.player.alive) {
      const xp = this.enemy.XPWorth
      this.player.giveXP(xp)

      let item
      if (this.enemy.loot) {
        item = this.player.inventory.loot(this.enemy.loot)
      }

      text += this.gainMessage(xp, item)
    }

    //dilation
    if (this.fucking) {
      const playerPart = this.player.getPart(this.fucking.player)
      const dilation = this.enemy.getDiameter(this.fucking.enemy) || 0

      if (typeof playerPart.dilate === "function") {
        text += playerPart.dilate(dilation) || ""
      }
    }

    //succubus perk
    if (
      this.fucking &&
      this.fucking.infects &&
      this.player.perks.has("succubus")
    ) {
      const hunger = this.player.eat(8)
      const health = this.player.heal(this.player.maxHP / 10)
      text += this.succubusMessage(hunger, health)
    }

    //infection
    if (this.fucking && this.fucking.infects) {
      const transformation = this.enemy.infect(this.player)

      if (transformation) {
        text += this.infectionMessage
        text += transformation
      }
    }

    //message
    if (this.player.orgasmed) {
      text += this.climaxLossMessage
    } else if (this.enemy.orgasmed) {
      text += this.climaxVictoryMessage
    } else if (!this.player.alive) {
      text += this.combatLossMessage
    } else {
      text += this.combatVictoryMessage
    }

    const you = this.player.who

    if (this.player.orgasmed || !this.player.alive) {
      this.fadeout = true
      text += `
        <p>
          Time passes before ${you} regain your senses.
        </p>
      `
    }

    if (this.player.orgasmed) {
      this.player.soothe(999999)
    }

    this.render({
      text: text,
      hideStats: true,
      responses: [{ state: "exit" }]
    })
  }

  //go back to main state
  exit() {
    this.game.world.advance()

    if (this.fadeout) {
      this.fade().then(() => this.game.switchState("main"))
    } else {
      this.game.switchState("main")
    }
  }

  // Enemy choices
  //--------------

  //available positions for this encounter - extend this
  get positions() {
    return [
      //example data
      //{name: 'anal',    player: 'anus',    enemy: 'penis'}
    ]
  }

  get availablePositions() {
    const positions = this.positions
      .filter(
        position =>
          this.player.has(position.player) && this.enemy.has(position.enemy)
      )
      .filter(position => !position.hasOwnProperty("if") || position.if)
      .sort((a, b) => a.name > b.name)

    positions.forEach(position => {
      if (position.player === "penis" && this.player.perks.has("impotent")) {
        position.disabled = true
      }
    })

    return positions
  }

  enemyChoosePosition() {
    const choices = this.availablePositions.filter(
      position => !position.disabled
    )
    const weights = choices.map(position => this.enemy.likes(position.player))

    if (!choices.length) {
      return false
    } else {
      return chance.weighted(choices, weights)
    }
  }

  // Helper messages
  //----------------

  attackResultsMessage(damage) {
    return `<p>You deal <b>${damage} damage</b></p>`
  }

  attackedResultsMessage(damage, lust) {
    let text = `You suffer <b>${damage} damage</b>`

    if (lust) {
      text += `, it feels good — you gain <b>${lust} lust</b>`
    }

    return `<p>${text}.</p>`
  }

  seduceResultsMessage(lust) {
    return `<p>${Grammar.capitalize(
      this.enemy.who
    )} gains <b>${lust} lust</b></p>`
  }

  seducedResultsMessage(lust) {
    return `<p>You gain <b>${lust} lust</b></p>`
  }

  get tooHornyMessage() {
    const you = this.game.player.who

    return `<p>${Grammar.capitalize(
      you
    )} are overwhelmed with lust and unable to control your actions.</p>`
  }

  get tooWeakMessage() {
    const you = this.game.player.who
    const your_body = this.game.player.parts.body.your

    return `<p>${Grammar.capitalize(
      you
    )} have lost all strength in ${your_body} and are unable to resist.</p>`
  }

  succubusMessage(hunger, health) {
    const you = Grammar.capitalize(this.game.player.who)

    if (hunger || health) {
      const and = health && hunger ? "and" : ""
      hunger = hunger ? `${hunger} hunger` : ""
      health = health ? `${health} health` : ""

      return `<p>${you} are satiated by all that semen — <b>${hunger} ${and} ${health} restored</b>.</p>`
    } else {
      return ""
    }
  }

  gainMessage(xp, item) {
    let text = `Gained <b>${xp}xp</b>`

    if (item) {
      text += ` and found <b>${item.name}</b>`
    }

    return `<p>${text}.</p>`
  }

  get attackMessage() {
    const you = this.game.player.who

    return `<p>${Grammar.capitalize(you)} swing your ${
      this.player.weapon.name
    } at ${this.enemy.who}.</p>`
  }

  get fleeSuccessMessage() {
    const you = this.game.player.who

    return `<p>${Grammar.capitalize(you)} manage to run away from ${
      this.enemy.who
    }!</p>`
  }

  get fleeFailureMessage() {
    const you = this.game.player.who

    return `<p>${Grammar.capitalize(you)} try to flee but ${
      this.enemy.who
    } stops you in your tracks!</p>`
  }

  // Messages - extend these with encounter specific messages
  //---------------------------------------------------------

  // Combat messages
  //----------------

  get introMessage() {
    return ""
  }

  get describeEnemyMessage() {
    return ""
  }

  get mainMessage() {
    return ""
  }

  get playerAttackdeMessage() {
    return ""
  }

  get combatLossMessage() {
    return ""
  }

  get combatVictoryMessage() {
    return ""
  }

  get climaxLossMessage() {
    return ""
  }

  get climaxVictoryMessage() {
    return ""
  }

  // Seduction messages
  //-----------------

  get seducedMessage() {
    return ""
  }

  get notInterestedMessage() {
    return ""
  }

  get grappleFailureMessage() {
    return ""
  }

  // Fucking messages
  //-----------------

  //These need to be able to return a message for each available position

  get playerInitiatePositionMessage() {
    return ""
  }

  get enemyInitiatePositionMessage() {
    return ""
  }

  get playerContinuePositionMessage() {
    return ""
  }

  get enemyContinuePositionMessage() {
    return ""
  }

  get struggleSuccessMessage() {
    return ""
  }

  get struggleFailureMessage() {
    return ""
  }

  get climaxMessage() {
    return ""
  }

  get pullOutMessage() {
    return ""
  }

  get infectionMessage() {
    return ""
  }
}
