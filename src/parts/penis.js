import Part from "./_super"

export default class Penis extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("dick")
    this.addSynonym("dong")
    this.addSynonym("cock")
    this.addSynonym("shaft")
    this.addSynonym("penis")
    this.addSynonym("phallus")
    this.addSynonym("pecker", null, () => this.size < 4)

    this.addAdjective("minuscule", () => this.size < 2)
    this.addAdjective("cute", () => this.between(2, 4))
    this.addAdjective("tiny", () => this.between(2, 4))
    this.addAdjective("useless", () => this.between(2, 4))
    this.addAdjective("medium", () => this.between(4, 7))
    this.addAdjective("average", () => this.between(4, 7))
    this.addAdjective("ordinary", () => this.between(4, 7))
    this.addAdjective("unexceptional", () => this.between(4, 7))
    this.addAdjective("large", () => this.between(7, 12))
    this.addAdjective("hefty", () => this.between(7, 12))
    this.addAdjective("generous", () => this.between(7, 12))
    this.addAdjective("impressive", () => this.between(7, 12))
    this.addAdjective("giant", () => this.size > 12)
    this.addAdjective("massive", () => this.size > 12)
    this.addAdjective("monstrous", () => this.size > 12)
    this.addAdjective("humongous", () => this.size > 12)

    this.addAdjective("limp", () => !this.functional)
    this.addAdjective("useless", () => !this.functional)
    this.addAdjective("impotent", () => !this.functional)

    this.addAdjective(
      "flaccid",
      () => this.functional && this.owner.lustNormalized < 0.15
    )
    this.addAdjective(
      "erect",
      () => this.functional && this.owner.lustNormalized >= 0.3
    )
    this.addAdjective(
      "stiff",
      () => this.functional && this.owner.lustNormalized >= 0.3
    )
    this.addAdjective(
      "throbbing",
      () => this.functional && this.owner.lustNormalized >= 0.3
    )
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 6, //in inches
      sensitivity: 0.75,
      quantity: 0,
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
        With a wicked smirk on [each of:your:face], [you] firmly grab
        [one of:your:adjective:penis]. Jerking it a few times while humping the
        air.`
  }

  get canSeduce() {
    return true
  }
}
