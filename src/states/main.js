import State from "./_super"

export default class Main extends State {
  constructor(game) {
    super(game)

    this.area = game.world.area

    this.state.main()
  }

  checkpoint() {
    this.game.save()
  }

  get FSMStates() {
    return [
      { name: "main", from: "*" },
      { name: "areaIntro", from: "main" },
      { name: "levelUp", from: "main" },
      { name: "chooseArea", from: "main" },
      { name: "travel", from: "chooseArea" },
      { name: "switchArea", from: "travel" },
      { name: "inventory", from: "main" },
      { name: "sunset", from: "main" },
      { name: "rest", from: "main" },
      { name: "sunrise", from: "rest" },
      { name: "heal", from: "main" },
      { name: "self", from: "*" },
      { name: "camp", from: "*" },
      { name: "masturbate", from: "self" },
      { name: "gear", from: "self" },
      { name: "body", from: "self" },
      { name: "perks", from: "self" },

      { name: "explore", from: "main" },
      { name: "exploreResult", from: "explore" }
    ]
  }

  main() {
    if (this.area.lvl < 1) {
      this.state.areaIntro()
    }

    //if the player 'died', restore them back to 1 hp
    if (this.game.player.health < 1) {
      this.game.player.stats.dmg = this.game.player.healthMax - 1
    }

    //if the player is at max lust, reduce it by 1 to allow them to masturbate for release
    if (this.game.player.lustNormalized === 1) {
      this.game.player.stats.lust = this.game.player.lustMax - 1
    }

    const wounded = this.game.player.healthNormalized < 1
    const mortallyWounded = this.game.player.health === 1
    const aroused = this.game.player.lust === this.game.player.lustMax - 1

    this.checkpoint()

    if (this.game.world.transitioned) {
      return this.state.sunset()
    }

    let text = this.area.description

    if (this.game.world.day) {
      text =
        (this.game.player.woundedDescription ||
          this.game.player.arousedDescription ||
          this.game.player.hungerDescription) +
        `

          ${text}`
    }

    this.render({
      text: text,
      responses: [
        {
          text: "**Level up!**",
          state: "levelUp",
          if: this.game.player.canLvlUp
        },
        {
          text: `explore **${this.area.name}**`,
          state: "explore",
          disabled: this.game.world.night || mortallyWounded || aroused
        },
        {
          text: "rest until healed",
          state: "heal",
          if: wounded && this.game.world.day
        },
        {
          text: "sleep",
          state: "rest",
          disabled: this.game.world.day,
          if: !(wounded && this.game.world.day)
        },
        { text: "self", state: "self" },
        { text: "inventory", state: "inventory" },
        { text: "camp", state: "camp" },
        {
          text: "travel",
          state: "chooseArea",
          disabled: this.game.world.night || mortallyWounded || aroused,
          if: this.availableTravelAreas.length > 0
        }
      ]
    })
  }

  areaIntro() {
    this.area.lvlUp()

    this.render({
      text: this.area.introMessage,
      responses: [{ state: "main" }]
    })
  }

  levelUp() {
    this.game.switchState("level-up")
  }

  explore() {
    this.render({
      text: this.area.exploreMessage,
      responses: [{ state: "exploreResult" }]
    })
  }

  exploreResult() {
    const result = this.area.explore()

    if (typeof result === "string") {
      this.render({
        text: result,
        responses: [{ state: "main" }]
      })

      this.game.world.advance()
    }
  }

  chooseArea() {
    const options = this.availableTravelAreas.map(area => ({
      text: area.name,
      state: "travel",
      area: area
    }))

    options.push({
      text: "back",
      state: "main"
    })

    this.render({
      text: `Where would you like to travel to?`,
      responses: options
    })
  }

  travel(data) {
    this.render({
      text: `You pack your bags and and travel to the **${data.area.name}**.`,
      responses: [{ state: "switchArea", area: data.area }]
    })
  }

  switchArea(data) {
    this.game.world.switchArea(data.area)
    this.fade().then(() => this.game.switchState("main"))
  }

  rest() {
    this.game.world.advanceToDawn()

    this.render({
      text: this.area.sleepMessage,
      responses: [{ state: "sunrise" }]
    })
  }

  heal() {
    this.game.world.advanceUntilHealed()

    this.render({
      text: `You lay down and rest.`,
      responses: [{ state: "main", fade: true }]
    })
  }

  sunrise() {
    let wetDream = ""
    if (this.game.player.lustNormalized > 0.5) {
      wetDream = `

          **You had a wet dream** — Your loins are on fire and you've made a sticky mess down there.
          Your memories of the wonderfully depraved dream quickly fade away, leaving you with a burning desire.`
    }

    this.game.player.arouse(this.game.player.lust / 2)

    this.fade().then(() => {
      this.game.world.transitioned = false
      this.render({
        text: this.area.sunriseMessage + wetDream,
        responses: [{ state: "main" }]
      })
    })
  }

  sunset() {
    this.game.world.transitioned = false
    this.render({
      text: this.area.sunsetMessage,
      responses: [{ state: "main" }]
    })
  }

  inventory() {
    this.game.switchState("inventory")
  }

  self() {
    this.render({
      static: this.game.player.statsDescription,
      responses: [
        { text: "examine body", state: "body" },
        { text: "gear", state: "gear" },
        { text: "perks", state: "perks" },
        { text: "masturbate", state: "masturbate" },
        { text: "back", state: "main" }
      ]
    })
  }

  camp() {
    let time = this.game.world.time.hour
    if (time < 12) {
      time = `${time} am`
    } else if (time === 12) {
      time = `noon`
    } else if (time === 24) {
      time = `midnight`
    } else {
      time = `${time - 12} pm`
    }

    this.render({
      text: `
        It's **${time}**.

        ${this.area.campDescription}`,
      responses: [{ text: "back", state: "main" }]
    })
  }

  masturbate() {
    this.game.switchState("masturbate")
  }

  gear() {
    this.render({
      text: this.game.player.equipmentDescription,
      responses: [{ text: "back", state: "self" }]
    })
  }

  body() {
    this.render({
      text: this.game.player.bodyDescription,
      responses: [{ text: "back", state: "self" }]
    })
  }

  perks() {
    const text = this.game.player.perks.listGranted
      .filter(perk => perk.available)
      .map(
        perk => `**${perk.name}**: <q>${perk.description}</q> — ${perk.effect}`
      ).join(`

      `)

    this.render({
      text: text || `You don't have any perks yet.`,
      responses: [{ text: "back", state: "self" }]
    })
  }

  get availableTravelAreas() {
    return this.game.world.availableAreas.filter(area => !area.stats.current)
  }
}
