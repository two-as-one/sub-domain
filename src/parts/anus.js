import { chance } from "utils/chance"
import Part from "./_super"

export default class Anus extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("anus")
    this.addSynonym("rectum")
    this.addSynonym("rosebud")
    this.addSynonym("butthole")

    this.addAdjective("firm", () => this.size <= 1)
    this.addAdjective("tight", () => this.size <= 1)
    this.addAdjective("puckered", () => this.size <= 1)
    this.addAdjective("used", () => this.between(1, 3))
    this.addAdjective("loose", () => this.between(1, 3))
    this.addAdjective("sloppy", () => this.between(1, 3))
    this.addAdjective("wide", () => this.size > 3)
    this.addAdjective("gaping", () => this.size > 3)
    this.addAdjective("greedy", () => this.size > 3)
    this.addAdjective("ravenous", () => this.size > 3)
    this.addAdjective("cavernous", () => this.size > 3)
    this.addAdjective("gluttonous", () => this.size > 3)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.2, //diameter of opening
      sensitivity: 0.75,
      quantity: 1,
    })
  }

  get description() {
    let description

    if (this.has) {
      if (this.quantity === 1) {
        description = `[a] ${this.adjective} ${this.name}`
      } else {
        description = `${this.number} ${this.adjective} ${this.name}`
      }

      return `**${description}** nestled in between.`
    }

    return ""
  }

  get seductionMessage() {
    return chance.pickone([
      `You turn around and place [your:hands] on [your:adjective:hips].
        Looking back over your shoulder, [you] invitingly sway your bottom back and forth.
        Then, with a playful smirk on [your:face], you firmly slap [your:own:butt].`,
      `You turn around and bend over.
        Looking at [foe] from between your own legs, you invitingly shake [your:adjective:butt] at [them].`,
    ])
  }

  get canSeduce() {
    return true
  }

  dilate(size) {
    if (this.size < size) {
      this.grow()

      return `**[your:adjective:anus]~>have been stretched** and >be now looser.`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }
}
