import Scene from "./_super"
import { lib, combine } from "library/library"

export default class MainScene extends Scene {
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
      { name: "exploreResult", from: "explore" },
    ]
  }

  main() {
    if (this.area.lvl < 1) {
      this.state.areaIntro()
    }

    //if the player 'died', restore them back to 1 hp
    if (this.game.player.health < 1) {
      this.game.player.stored.dmg = this.game.player.healthMax - 1
    }

    //if the player is at max lust, reduce it by 1 to allow them to masturbate for release
    if (this.game.player.lustNormalized === 1) {
      this.game.player.stored.lust = this.game.player.lustMax - 1
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
      text = `
          ${this.game.player.woundedDescription ||
            this.game.player.arousedDescription}

          ${text}`
    }

    this.render({
      text: text,
      responses: [
        {
          text: "**Level up!**",
          state: "levelUp",
          if: this.game.player.canLvlUp,
        },
        {
          text: `explore **${this.area.name}**`,
          state: "explore",
          disabled: this.game.world.night || mortallyWounded || aroused,
        },
        {
          text: "rest until healed",
          state: "heal",
          if: wounded && this.game.world.day,
        },
        {
          text: "sleep",
          state: "rest",
          disabled: this.game.world.day,
          if: !(wounded && this.game.world.day),
        },
        { text: "self", state: "self" },
        { text: "inventory", state: "inventory" },
        { text: "camp", state: "camp" },
        {
          text: "travel",
          state: "chooseArea",
          disabled: this.game.world.night || mortallyWounded || aroused,
          if: this.availableTravelAreas.length > 0,
        },
      ],
    })
  }

  areaIntro() {
    this.area.lvlUp()

    this.render({
      text: lib(this.area, "INTRO"),
      responses: [{ state: "main" }],
    })
  }

  async levelUp() {
    await this.game.subScene("level-up")
    this.state.main()
  }

  explore() {
    this.render({
      text: lib(this.area, "EXPLORE"),
      responses: [{ state: "exploreResult" }],
    })
  }

  exploreResult() {
    const result = this.area.explore()

    if (typeof result === "string") {
      this.render({
        text: result,
        responses: [{ state: "main" }],
      })

      this.game.world.advance()
    }
  }

  chooseArea() {
    const options = this.availableTravelAreas.map(area => ({
      text: area.name,
      state: "travel",
      area: area,
    }))

    options.push({
      text: "back",
      state: "main",
    })

    this.render({
      text: lib("CHOOSE_TRAVEL_DESTINATION"),
      responses: options,
    })
  }

  travel(data) {
    this.game.world.switchArea(data.area)

    this.render({
      text: lib("TRAVEL_CONFIRMATION"),
      responses: [{ state: "switchArea" }],
    })
  }

  switchArea(data) {
    this.fade().then(() => this.game.setScene("main"))
  }

  rest() {
    this.game.world.advanceToDawn()

    this.render({
      text: lib(this.area, "SLEEP"),
      responses: [{ state: "sunrise" }],
    })
  }

  heal() {
    this.game.world.advanceUntilHealed()

    this.render({
      text: lib("REST_UNTIL_HEALED"),
      responses: [{ state: "main", fade: true }],
    })
  }

  sunrise() {
    this.game.player.arouse(this.game.player.lust / 2)

    let wetDream = ""
    if (this.game.player.lustNormalized > 0.5) {
      wetDream = lib("WET_DREAM")
    }

    this.fade().then(() => {
      this.game.world.transitioned = false
      this.render({
        text: combine(lib(this.area, "SUNRISE"), wetDream),
        responses: [{ state: "main" }],
      })
    })
  }

  sunset() {
    this.game.world.transitioned = false
    this.render({
      text: lib(this.area, "SUNSET"),
      responses: [{ state: "main" }],
    })
  }

  async inventory() {
    await this.game.subScene("inventory")
    this.state.main()
  }

  self() {
    this.render({
      static: this.game.player.statsDescription,
      responses: [
        { text: "examine body", state: "body" },
        // DISABLED UNTIL MORE GEAR
        // { text: "gear", state: "gear" },
        // DISABLED UNTIL USEFUL PERKS
        // { text: "perks", state: "perks" },
        { text: "masturbate", state: "masturbate" },
        { text: "back", state: "main" },
      ],
    })
  }

  camp() {
    this.render({
      text: combine(lib("CURRENT_TIME"), lib(this.area, "CAMP_DESCRIPTION")),
      responses: [{ text: "back", state: "main" }],
    })
  }

  async masturbate() {
    await this.game.subScene("masturbate")
    this.state.main()
  }

  gear() {
    this.render({
      text: this.game.player.equipmentDescription,
      responses: [{ text: "back", state: "self" }],
    })
  }

  body() {
    this.render({
      text: this.game.player.bodyDescription,
      responses: [{ text: "back", state: "self" }],
    })
  }

  perks() {
    const text = this.game.player.perks.listGranted
      .filter(perk => perk.available)
      .map(perk => `**${perk.name}**: "${perk.description}" — ${perk.effect}`)
      .join(`

      `)

    this.render({
      text: text || `You don't have any perks yet.`,
      responses: [{ text: "back", state: "self" }],
    })
  }

  get availableTravelAreas() {
    return this.game.world.availableAreas.filter(area => !area.stored.current)
  }
}
