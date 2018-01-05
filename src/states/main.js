import Grammar from "utils/grammar"
import Mastrubate from "encounters/masturbate"
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
      { name: "self", from: "main" },
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
    if (this.game.player.currentHP < 1) {
      this.game.player.stats.dmg = this.game.player.maxHP - 1
    }

    const wounded = this.game.player.normalizedHP < 1
    const mortallyWounded = this.game.player.currentHP === 1
    const aroused = this.game.player.normalizedLust === 1

    this.checkpoint()

    if (this.game.world.transitioned) {
      return this.state.sunset()
    }

    let text = this.area.description

    if (this.game.world.day) {
      text =
        (this.game.player.woundedDescription ||
          this.game.player.hungerDescription) + text
    }

    this.render({
      text: text,
      responses: [
        {
          text: "<b>Level up!</b>",
          state: "levelUp",
          if: this.game.player.canLvlUp
        },
        {
          text: `explore <b>${this.area.name}</b>`,
          state: "explore",
          disabled: this.game.world.night || mortallyWounded || aroused
        },
        {
          text: "travel",
          state: "chooseArea",
          disabled: this.game.world.night || mortallyWounded || aroused,
          if: this.availableTravelAreas.length > 0
        },
        {
          text: "sleep until healed",
          state: "heal",
          if: wounded && this.game.world.day
        },
        {
          text: "sleep",
          state: "rest",
          disabled: this.game.world.day,
          if: !(wounded && this.game.world.day)
        },
        { text: "inventory", state: "inventory" },
        { text: "self", state: "self" }
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
    } else {
      this.game.switchState(result)
    }
  }

  chooseArea() {
    const options = this.availableTravelAreas.map(area => ({
      text: area.name,
      state: "travel",
      area: area
    }))

    options.push({
      text: "cancel",
      state: "main"
    })

    this.render({
      text: `Where would you like to travel to?`,
      responses: options
    })
  }

  travel(data) {
    this.render({
      text: `<p>You pack your bags and and travel to the <b>${
        data.area.name
      }</b>.</p>`,
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
    this.fade().then(() => {
      this.game.world.transitioned = false
      this.render({
        text: this.area.sunriseMessage,
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
        { text: "masturbate", state: "masturbate" },
        { text: "examine body", state: "body" },
        { text: "examine gear", state: "gear" },
        { text: "view perks", state: "perks" },
        { text: "back", state: "main" }
      ]
    })
  }

  masturbate() {
    this.game.switchState(new Mastrubate(this.game))
  }

  gear() {
    this.render({
      text: this.game.player.equipmentDescription,
      responses: [{ text: "back", state: "main" }]
    })
  }

  body() {
    this.render({
      text: this.game.player.bodyDescription,
      responses: [{ text: "back", state: "main" }]
    })
  }

  perks() {
    const text = this.game.player.perks.listGranted
      .filter(perk => perk.available)
      .map(
        perk =>
          `<p>
            <b>${Grammar.capitalize(perk.name)}</b>:
            <q>${perk.description}</q> — ${perk.effect}
          </p>`
      )
      .join("")

    this.render({
      text: text || `You don't have any perks yet.`,
      responses: [{ text: "back", state: "main" }]
    })
  }

  get availableTravelAreas() {
    return this.game.world.availableAreas.filter(area => !area.stats.current)
  }
}
