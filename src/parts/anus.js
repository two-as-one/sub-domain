import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Anus extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.2, //diameter of opening
      sensitivity: 0.75,
      quantity: 1
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
    return Grammar.random([
      `You turn around and place [your:hands] on your hips.
        Looking back over your shoulder, [you] invitingly sway your bottom back and forth.
        Then, with a playful smirk on [your:face], you firmly slap your own ass.`,
      `You turn around and bend over.
        Looking at [foe] from between your own legs, you invitingly shake your ass at [them].`
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

  get singular() {
    return ["anus", "butthole", "rectum", "rosebud"]
  }

  get plural() {
    return ["anuses", "buttholes", "rectums", "rosebuds"]
  }

  get adjectives() {
    const adjectives = super.adjectives

    if (this.size < 1) {
      adjectives.push("tight", "firm")
    } else if (this.size < 3) {
      adjectives.push("used", "sloppy", "loose")
    } else {
      adjectives.push(
        "ravenous",
        "greedy",
        "wide",
        "gluttonous",
        "gaping",
        "cavernous"
      )
    }

    return adjectives
  }
}
