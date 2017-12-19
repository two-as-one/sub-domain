import Part from "./_super"

export default class Anus extends Part {
  get description() {
    let text

    if (this.has) {
      if (this.quantity === 1) {
        // prettier-ignore
        text = `<b>${Part.articlize(this.adjective)} ${this.pluralized}</b> nestled in between.`
      } else {
        // prettier-ignore
        text = `<b>${this.number} ${this.adjective} ${this.pluralized}</b> nestled in between.`
      }

      return Part.trim(`${text}`)
    }

    return ""
  }

  get seductionMessage() {
    return Part.random([
      `<p>
        You turn around and place your hands on your hips.
        Looking back over your shoulder, you invitingly sway your bottom back and forth.
        Then, with a playful smirk on your face, you firmly slap your own ass.
      </p>`,
      `<p>
        You turn around and bend over.
        Looking at your opponent from between your own legs, you invitingly shake your ass at them.
      </p>`
    ])
  }

  get canSeduce() {
    return true
  }

  dilate(size) {
    if (this.size < size) {
      this.grow()

      const was = this.quantity > 1 ? "were" : "was"
      const is = this.quantity > 1 ? "are" : "is"
      // prettier-ignore
      return `<p><b>${Part.capitalize(this.all)} ${was} stretched</b> and ${is} now looser.</p>`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }

  get saveKey() {
    return "player-part-anus"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 0.5, //diameter of opening
      sensitivity: 0.75,
      quantity: 1
    })
  }

  get singular() {
    return Part.random(["anus", "butthole", "rectum", "rosebud"])
  }

  get plural() {
    return Part.random(["anuses", "buttholes", "rectums", "rosebuds"])
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
