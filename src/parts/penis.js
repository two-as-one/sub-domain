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
  get diameter() {
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
          ${this.name}**`
      } else {
        text += `
          you/have **${this.number} ${this.adjective} ${this.size} inch
          ${this.name}**`
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
        With [your.face.multiple?wicked smirks|a wicked smirk] on [your:face],
        [you] firmly grab [one of:your:adjective:penis]. Jerking it a few times
        while humping the air.`
  }

  get canSeduce() {
    return true
  }

  get singular() {
    const words = ["penis", "dick", "dong", "cock", "shaft", "phallus"]

    if (this.size < 4) {
      words.push("pecker")
    }

    return words
  }

  get plural() {
    const words = ["penises", "dicks", "dongs", "cocks", "shafts", "phalluses"]

    if (this.size < 4) {
      words.push("peckers")
    }

    return words
  }

  get adjectives() {
    const adjectives = super.adjectives

    if (this.size < 2) {
      adjectives.push("minuscule")
    } else if (this.size < 4) {
      adjectives.push("cute", "tiny", "useless")
    } else if (this.size < 7) {
      adjectives.push("average", "medium", "ordinary", "unexceptional")
    } else if (this.size < 12) {
      adjectives.push("large", "impressive", "generous", "hefty")
    } else {
      adjectives.push("monstrous", "giant", "humongous")
    }

    if (!this.functional) {
      adjectives.push("limp", "useless")
    } else if (this.owner.lustNormalized < 0.15) {
      adjectives.push("flaccid")
    } else if (this.owner.lustNormalized < 0.3) {
      adjectives.push("semi-erect")
    } else {
      adjectives.push("throbbing", "erect")
    }

    return adjectives
  }
}
