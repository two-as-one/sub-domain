import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Penis extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      size: 6, //in inches
      sensitivity: 0.75,
      quantity: 0
    })
  }

  get functional() {
    if (this.owner.perks && this.owner.perks.has("impotent")) {
      return false
    }

    return true
  }

  // TODO - better formula
  get diameter () {
    return this.size / 5
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.owner.lustNormalized < 0.5 || !this.functional) {
        text = `Dangling `
      } else {
        text = `Throbbing with arousal `
      }

      text += `between your legs, `

      if (this.quantity === 1) {
        text += `
          you/have **[a] ${this.adjective} ${this.size} inch
          ${this.pluralized}**`
      } else {
        text += `
          you/have **${this.number} ${this.adjective} ${this.size} inch
          ${this.pluralized}**`
      }

      if (this.size < 2) {
        text += ` — so tiny and useless.`
      } else if (this.owner.perks.has("impotent")) {
        text += ` — unable to get hard.`
      } else {
        text += `.`
      }
    }

    return text
  }

  get seductionMessage() {
    return `
        With a wicked smirk on [your.face], [you] firmly grab [your.penis].
        Jerking [them] a few times while humping the air.`
  }

  get canSeduce() {
    return true
  }

  get singular() {
    return Grammar.random([
      "penis",
      "dick",
      "dong",
      "cock",
      "shaft",
      "pecker",
      "phallus"
    ])
  }

  get plural() {
    return Grammar.random([
      "penises",
      "dicks",
      "dongs",
      "cocks",
      "shafts",
      "peckers",
      "phalluses"
    ])
  }

  get adjective() {
    let adjectives

    if (!this.functional) {
      return Grammar.random(["limp", "useless"])
    }

    if (this.size < 2) {
      adjectives = ["minuscule"]
    } else if (this.size < 4) {
      adjectives = ["cute", "tiny", "useless"]
    } else if (this.size < 7) {
      adjectives = ["average", "medium", "ordinary", "unexceptional"]
    } else if (this.size < 12) {
      adjectives = ["large", "impressive", "generous", "hefty"]
    } else {
      adjectives = ["monstrous", "giant", "humongous"]
    }

    if (this.owner.lustNormalized < 0.5) {
      adjectives.push("flaccid")
    } else {
      adjectives.push("throbbing")
      adjectives.push("erect")
    }

    if (this.type !== 'human') {
      adjectives.push(this.type)
    }

    return Grammar.random(adjectives)
  }
}
