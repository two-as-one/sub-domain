import Part from "parts/_super"
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
      { name: "levelUp", from: "main" },
      { name: "chooseArea", from: "main" },
      { name: "travel", from: "chooseArea" },
      { name: "inventory", from: "main" },
      { name: "sunset", from: "main" },
      { name: "rest", from: "main" },
      { name: "sunrise", from: "rest" },
      { name: "heal", from: "main" },
      { name: "self", from: "main" },
      { name: "gear", from: "self" },
      { name: "body", from: "self" },
      { name: "perks", from: "self" },

      { name: "explore", from: "main" },
      { name: "exploreResult", from: "explore" }
    ]
  }

  main() {
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

    this.render({
      text:
        (this.game.player.woundedDescription ||
          this.game.player.hungerDescription) + this.area.description,
      responses: [
        {
          text: "<b>Level up!</b>",
          state: "levelUp",
          if: this.game.player.canLvlUp
        },
        {
          text: "explore " + this.area.name,
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
          if: !wounded
        },
        { text: "inventory", state: "inventory" },
        { text: "examine self", state: "self" }
      ]
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
      text: this.game.player.statsDescription,
      responses: [
        { text: "examine body", state: "body" },
        { text: "examine gear", state: "gear" },
        { text: "view perks", state: "perks" },
        { text: "back", state: "main" }
      ]
    })
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
          `<p><b>${Part.capitalize(perk.name)}</b>: <q>${
            perk.description
          }</q> — ${perk.effect}</p>`
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
