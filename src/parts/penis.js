import Part from "./_super"

export default class Penis extends Part {
  get saveKey() {
    return "player-part-penis"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 6, //in inches
      sensitivity: 0.75,
      quantity: 1
    })
  }

  get description() {
    let text

    if (this.has) {
      if (this.owner.normalizedLust < 0.5 || this.owner.perks.has("impotent")) {
        text = `Dangling `
      } else {
        text = `Throbbing with arousal `
      }

      text += `between your legs, `

      if (this.quantity === 1) {
        const adjective = Part.articlize(this.adjective)
        const size = this.size
        const penis = this.pluralized

        text += `you have <b>${adjective} ${size} inch ${penis}</b>`
      } else {
        const number = this.number
        const adjective = this.adjective
        const size = this.size
        const penises = this.pluralized

        text += `you have <b>${number} ${adjective} ${size} inch ${penises}</b>`
      }

      if (this.size < 2) {
        text += ` — so tiny and useless.`
      } else if (this.owner.perks.has("impotent")) {
        text += ` — unable to get hard.`
      } else {
        text += `.`
      }

      return Part.trim(text)
    }

    return ""
  }

  get seductionMessage() {
    return `
      <p>
        With a wicked smirk on your face, you firmly grab ${this.one}.
        Jerking it a few times while humping the air.
      </p>`
  }

  get canSeduce() {
    return true
  }

  get singular() {
    return Part.random([
      "penis",
      "dick",
      "dong",
      "cock",
      "shaft",
      "member",
      "pecker",
      "phallus"
    ])
  }

  get plural() {
    return Part.random([
      "penises",
      "dicks",
      "dongs",
      "cocks",
      "shafts",
      "members",
      "peckers",
      "phalluses"
    ])
  }

  get adjective() {
    let adjectives

    if (this.owner.perks.has("impotent")) {
      return Part.random(["limp", "useless"])
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

    if (this.owner.normalizedLust < 0.5) {
      adjectives.push("flaccid")
    } else {
      adjectives.push("throbbing")
      adjectives.push("erect")
    }

    return Part.random(adjectives)
  }
}
