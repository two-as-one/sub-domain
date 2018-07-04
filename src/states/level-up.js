import Grammar from "grammar/grammar"
import State from "./_super"

export default class LevelUp extends State {
  constructor(game) {
    super(game)

    this.state.choosePrimaryStats()
    this.stat = null
    this.perk = null
  }

  get FSMStates() {
    return [
      { name: "choosePrimaryStats", from: "*" },
      { name: "choosePerk", from: "choosePrimaryStats" },
      { name: "confirmation", from: "choosePerk" },
      { name: "end", from: "confirmation" }
    ]
  }

  choosePrimaryStats() {
    this.render({
      text: `You feel stronger — choose which stat to increase.`,
      responses: [
        { text: "Strength", stat: "str", state: "choosePerk" },
        { text: "Dexterity", stat: "dex", state: "choosePerk" },
        { text: "Stamina", stat: "stam", state: "choosePerk" },
        { text: "Charisma", stat: "char", state: "choosePerk" },
        { text: "Willpower", stat: "will", state: "choosePerk" }
      ]
    })
  }

  choosePerk(choice) {
    this.stat = choice.stat

    const responses = this.game.player.perks.listAvailable.map(perk => ({
      text: `${perk.name} — <q>${perk.description}</q>`,
      state: "confirmation",
      perk: perk
    }))

    if (responses.length) {
      this.render({
        text: `Choose a perk.`,
        responses: responses
      })
    } else {
      this.render({
        text: `Choose a perk — No eligible perks!`,
        responses: [{ state: "confirmation" }]
      })
    }
  }

  confirmation(choice) {
    this.perk = choice.perk
    let perkDescription = ""

    const map = {
      str: "Strength",
      dex: "Dexterity",
      stam: "Stamina",
      char: "Charisma",
      will: "Willpower"
    }

    if (this.perk) {
      perkDescription += `
          **${Grammar.capitalize(this.perk.name)}**:
          <q>${this.perk.description}</q> — ${this.perk.effect}`
    }

    this.render({
      text: `
        You/will gain:

        **+2 ${map[this.stat]}**

        ${perkDescription}`,
      responses: [
        { text: "OK", state: "end" },
        { text: "I've changed my mind", state: "choosePrimaryStats" }
      ]
    })
  }

  end() {
    this.game.player.stored[this.stat] += 2
    this.game.player.stored.lvl += 1

    if (this.perk) {
      this.game.player.perks.grant(this.perk.name)
    }

    this.game.switchState("main")
  }
}
