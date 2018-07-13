import State from "./_super"

const STATS = [
  {
    key: "str",
    name: "Strength",
    label: "Physical prowess",
    desc: ""
  },
  {
    key: "stam",
    name: "Stamina",
    label: "Physical endurance",
    desc: ""
  },
  {
    key: "dex",
    name: "Dexterity",
    label: "Flexibility and grace",
    desc: ""
  },
  {
    key: "char",
    name: "Charisma",
    label: "Persuasiveness",
    desc: ""
  },
  {
    key: "will",
    name: "Willpower",
    label: "Mental fortitude",
    desc: ""
  }
]

export default class LevelUp extends State {
  constructor(game) {
    super(game)

    this.state.choosePrimaryStats()
    this.stat = null
  }

  get FSMStates() {
    return [
      { name: "choosePrimaryStats", from: "*" },
      { name: "confirmation", from: "choosePrimaryStats" },
      { name: "end", from: "confirmation" }
    ]
  }

  choosePrimaryStats() {
    this.render({
      text: `You feel stronger — choose which stat to increase.`,
      responses: STATS.map(stat => ({
        text: `${stat.name} — "${stat.label}"`,
        stat: stat,
        state: "confirmation"
      }))
    })
  }

  confirmation(choice) {
    this.stat = choice.stat

    this.render({
      text: `
        Level up and gain **+2 ${this.stat.name}**?

        ${this.stat.desc}`,
      responses: [
        { text: "Yes please!", state: "end" },
        { text: "I've changed my mind", state: "choosePrimaryStats" }
      ]
    })
  }

  end() {
    this.game.player.stored[this.stat.key] += 2
    this.game.player.stored.lvl += 1

    this.game.switchState("main")
  }
}
