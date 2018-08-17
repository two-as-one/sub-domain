import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Vagina extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.8, //diameter of opening
      sensitivity: 0.75,
      quantity: 0
    })
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.owner.penis.has) {
        text += `Further down you also have `
      } else {
        text += `You/have `
      }

      if (this.quantity === 1) {
        text += `**[a] ${this.adjective} ${this.name}**`
      } else {
        text += `**${this.number} ${this.adjective} ${this.name}**`
      }

      if (this.owner.penis.has) {
        text += `.`
      } else {
        text += ` between your legs.`
      }
    }

    return text
  }

  get seductionMessage() {
    return `
        You spread your legs lightly while facing [foe]. Placing [your.hands] on
        your inner thighs and sensually moving [them] upwards towards
        [your.vagina] but never quite reaching [them].`
  }

  get canSeduce() {
    return true
  }

  dilate(size) {
    if (this.size < size) {
      this.grow()

      return `**[your.vagina]~>have been stretched** and >be now looser.`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }

  get singular() {
    return Grammar.random(["vagina", "pussy", "cunt", "cunny", "slit", "vulva"])
  }

  get plural() {
    return Grammar.random([
      "vaginas",
      "pussies",
      "cunts",
      "cunnies",
      "slits",
      "vulvae"
    ])
  }

  get adjectives() {
    const adjectives = super.adjectives

    if (this.size < 1) {
      adjectives.push("tight", "firm")
    } else if (this.size < 3) {
      adjectives.push("used", "sloppy", "loose", "plump")
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
