import Part from "parts/_super"
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

    let description = `<p>You will gain:</p>`

    switch (this.stat) {
      case "str":
        description += `<p><b>+2 Strength</b></p>`
        break
      case "dex":
        description += `<p><b>+2 Dexterity</b></p>`
        break
      case "stam":
        description += `<p><b>+2 Stamina</b></p>`
        break
      case "char":
        description += `<p><b>+2 Charisma</b></p>`
        break
      case "will":
        description += `<p><b>+2 Willpower</b></p>`
        break
    }

    if (this.perk) {
      // prettier-ignore
      description += `
        <p><b>${Part.capitalize(this.perk.name)}</b>: <q>${this.perk.description}</q> — ${this.perk.effect}</p>
      `
    }

    this.render({
      text: description,
      responses: [
        { text: "OK", state: "end" },
        { text: "I've changed my mind", state: "choosePrimaryStats" }
      ]
    })
  }

  end() {
    this.game.player.stats[this.stat] += 2
    this.game.player.stats.lvl += 1

    if (this.perk) {
      this.game.player.perks.grant(this.perk.name)
    }

    this.game.switchState("main")
  }
}
