import Part from "./_super"

export default class Balls extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      size: 1, //length in inches
      sensitivity: 0.5,
      quantity: 0, //number of testicles in the scrotum
      external: true, //whether the scrotum is inside or outside of the body
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

      text += `**[a] ${this.adjective} scrotum** containing `

      if (this.quantity === 1) {
        text += ` **a single`
      } else if (this.quantity === 2) {
        text += ` **a pair of`
      } else {
        text += ` **${this.number}`
      }

      text += ` ${this.name}**`

      if (!this.owner.penis.has) {
        if (this.owner.vagina.has) {
          const your_pussy = this.owner.vagina.name
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
      text += ` with its singular ${this.name}`
    } else if (this.quantity === 2) {
      text += ` with both of its ${this.name}`
    } else {
      text += ` with all of its ${this.name}`
    }

    return text
  }

  get singular() {
    return ["ball", "testicle"]
  }

  get plural() {
    return ["balls", "testicles"]
  }

  get scrotumSize() {
    return this.quantity * this.size
  }

  get adjectives() {
    const adjectives = super.adjectives

    if (!this.stored.external) {
      adjectives.push("internal")
    } else if (this.scrotumSize < 4) {
      adjectives.push("tight")
    } else if (this.scrotumSize < 8) {
      adjectives.push("heavy", "saggy")
    } else {
      adjectives.push("monstrous")
    }

    return adjectives
  }
}
