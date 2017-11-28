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
      if (this.owner.parts.penis.has) {
        text += `You also have `
      } else {
        text += `You have `
      }

      if (this.quantity === 1) {
        text += `<b>${Part.articlize(this.adjective)} ${this.pluralized}</b>`
      } else {
        text += `<b>${this.number} ${this.adjective} ${this.pluralized}</b>`
      }

      if (this.owner.parts.penis.has) {
        text += `.`
      } else {
        text += ` between your legs.`
      }

      return Part.trim(text)
    }

    return ""
  }

  get seductionMessage() {
    return `
      <p>
        You spread your legs lightly while facing you opponent.
        Placing your hands on your inner thighs and sensually moving them upwards towards ${
          this.all
        } but never quite reaching it.
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
      return `<p><b>${Part.capitalize(this.all)} ${was} stretched</b> and ${
        is
      } now looser.</p>`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }

  get singular() {
    return Part.random(["vagina", "pussy", "cunt", "cunny", "slit", "vulva"])
  }

  get plural() {
    return Part.random([
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
      return Part.random(["tight", "firm"])
    } else if (this.size < 3) {
      return Part.random(["used", "sloppy", "loose"])
    } else {
      return Part.random([
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
