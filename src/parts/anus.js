import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Anus extends Part {
  get saveKey() {
    return "player-part-anus"
  }

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
        description = Grammar.a(`${this.adjective} ${this.pluralized}`)
      } else {
        description = `${this.number} ${this.adjective} ${this.pluralized}`
      }

      return `**${description}** nestled in between.`
    }

    return ""
  }

  get seductionMessage() {
    const you = this.owner.who

    return Grammar.random([
      `You turn around and place your hands on your hips.
        Looking back over your shoulder, ${you} invitingly sway your bottom back and forth.
        Then, with a playful smirk on your face, you firmly slap your own ass.`,
      `You turn around and bend over.
        Looking at your opponent from between your own legs, you invitingly shake your ass at them.`
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
      const your_anus = Grammar.capitalize(this.all)

      return `**${your_anus} ${was} stretched** and ${is} now looser.`
    }
  }

  get growth() {
    return this.size > 2 ? this.size / 10 : 0.2
  }

  get singular() {
    return Grammar.random(["anus", "butthole", "rectum", "rosebud"])
  }

  get plural() {
    return Grammar.random(["anuses", "buttholes", "rectums", "rosebuds"])
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
