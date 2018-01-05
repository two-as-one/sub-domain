import Grammar from "utils/grammar"
import Part from "./_super"

export default class Udder extends Part {
  get saveKey() {
    return "player-part-udder"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
      size: 0,
      sensitivity: 0.5,
      teats: 4
    })
  }

  get teats() {
    return this.stats.teats
  }

  set teats(number) {
    this.stats.teats = number
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.size < 4) {
        text += `nestled below your belly button `
      } else {
        text += `attached below your belly button but hanging between your legs `
      }

      if (this.quantity === 1) {
        const adjective = Grammar.articlize(this.adjective)
        const udder = this.pluralized

        text += `you have <b>${adjective} ${udder}</b>`
      } else {
        const number = this.number
        const adjective = this.adjective
        const udders = this.pluralized

        text += `you have <b>${number} ${adjective} ${udders}</b>`
      }

      text += ` with <b>${Grammar.number(this.teats)} teats</b>`

      if (this.quantity > 1) {
        text += ` each`
      }

      if (this.size >= 8) {
        if (this.quantity === 1) {
          text += ` — it bounces around against your inner thighs as you walk`
        } else {
          text += ` — they bounce around against your inner thighs as you walk`
        }
      }
    }

    if (text) {
      text = `<p>${Grammar.capitalize(text)}.</p>`
    }

    return text
  }

  get singular() {
    return Grammar.random(["udder"])
  }

  get plural() {
    return Grammar.random(["udders"])
  }

  get adjective() {
    if (this.size < 4) {
      return Grammar.random(["small", "little", "perky"])
    } else if (this.size < 8) {
      return Grammar.random(["modest", "sizable"])
    } else if (this.size < 12) {
      return Grammar.random(["hefty", "heavy", "large"])
    } else {
      return Grammar.random(["humongous", "enormous", "massive", "imposing"])
    }
  }
}
