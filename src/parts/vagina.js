import Grammar from "utils/grammar"
import Part from "./_super"

export default class Vagina extends Part {
  get saveKey() {
    return "player-part-vagina"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.8, //diameter of opening
      sensitivity: 0.75,
      quantity: 1
    })
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.owner.penis.has) {
        text += `You also have `
      } else {
        text += `You/have `
      }

      if (this.quantity === 1) {
        text += `<b>${Grammar.articlize(this.adjective)} ${this.pluralized}</b>`
      } else {
        text += `<b>${this.number} ${this.adjective} ${this.pluralized}</b>`
      }

      if (this.owner.penis.has) {
        text += `.`
      } else {
        text += ` between your legs.`
      }

      return Grammar.trim(text)
    }

    return ""
  }

  get seductionMessage() {
    const your_pussy = this.all

    return `
      <p>
        You spread your legs lightly while facing your opponent.
        Placing your hands on your inner thighs and sensually moving them upwards towards ${your_pussy} but never quite reaching it.
      </p>`
  }

  get canSeduce() {
    return true
  }

  dilate(size) {
    if (this.size < size) {
      this.grow()

      const was = this.quantity > 1 ? "were" : "was"
      const is = this.quantity > 1 ? "are" : "is"
      const your_pussy = Grammar.capitalize(this.all)

      return `<p><b>${your_pussy} ${was} stretched</b> and ${is} now looser.</p>`
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

  get adjective() {
    if (this.size < 1) {
      return Grammar.random(["tight", "firm"])
    } else if (this.size < 3) {
      return Grammar.random(["used", "sloppy", "loose"])
    } else {
      return Grammar.random([
        "ravenous",
        "greedy",
        "wide",
        "gluttonous",
        "gaping",
        "cavernous"
      ])
    }
  }
}
