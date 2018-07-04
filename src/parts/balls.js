import Grammar from "grammar/grammar"
import Part from "./_super"

export default class Balls extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      size: 1, //length in inches
      sensitivity: 0.5,
      quantity: 2, //number of testicles in the scrotum
      external: true //whether the scrotum is inside or outside of the body
    })
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.stored.external) {
        if (this.owner.penis.has) {
          if (this.owner.penis.quantity > 1) {
            text += `They are accompanied by `
          } else {
            text += `It's accompanied by `
          }
        } else if (this.owner.vagina.has) {
          if (this.owner.vagina.quantity > 1) {
            text += `Hanging in front of them, you/have `
          } else {
            text += `Hanging in front of it, you/have `
          }
        } else {
          text += `Hanging between your legs, you/have `
        }
      } else {
        text += `Inside your abdomen sits `
      }

      text += `**${Grammar.articlize(this.adjective)} scrotum** containing `

      if (this.quantity === 1) {
        text += ` **a single`
      } else if (this.quantity === 2) {
        text += ` **a pair of`
      } else {
        text += ` **${this.number}`
      }

      text += ` ${this.pluralized}**`

      if (!this.owner.penis.has) {
        if (this.owner.vagina.has) {
          const your_pussy = this.owner.vagina.pluralized
          text += ` — it somehow allows your ${your_pussy} to squirt semen.`
        } else {
          text += ` — without any outlet for semen, you are constantly aroused.`
        }
      } else {
        text += `.`
      }
    } else if (this.owner.penis.has) {
      if (this.owner.penis.quantity > 1) {
        text += `They are `
      } else {
        text += `It's `
      }

      text += `**lacking a scrotum** and can't produce semen.`
    }

    return text
  }

  get all() {
    let text = `your ${this.adjective} scrotum`

    if (this.quantity === 1) {
      text += ` with its singular ${this.pluralized}`
    } else if (this.quantity === 2) {
      text += ` with both of its ${this.pluralized}`
    } else {
      text += ` with all of its ${this.pluralized}`
    }

    return text
  }

  get singular() {
    return Grammar.random(["ball", "testicle"])
  }

  get plural() {
    return Grammar.random(["balls", "testicles"])
  }

  get scrotumSize() {
    return this.quantity * this.size
  }

  get adjective() {
    if (!this.stored.external) {
      return "internal"
    }

    if (this.scrotumSize < 4) {
      return "tight"
    } else if (this.scrotumSize < 8) {
      return Grammar.random(["heavy", "saggy"])
    } else {
      return `monstrous`
    }
  }
}
