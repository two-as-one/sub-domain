import Part from "./_super"

export default class Balls extends Part {
  get saveKey() {
    return "player-part-balls"
  }

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
      if (this.stats.external) {
        if (this.owner.parts.penis.has) {
          if (this.owner.parts.penis.quantity > 1) {
            text += `They are accompanied by `
          } else {
            text += `It's accompanied by `
          }
        } else if (this.owner.parts.vagina.has) {
          if (this.owner.parts.vagina.quantity > 1) {
            text += `Hanging in front of them, you have `
          } else {
            text += `Hanging in front of it, you have `
          }
        } else {
          text += `Hanging between your legs, you have `
        }
      } else {
        text += `Inside your abdomen sits `
      }

      text += `<b>${Part.articlize(this.adjective)} scrotum</b> containing `

      if (this.quantity === 1) {
        text += ` <b>a single`
      } else if (this.quantity === 2) {
        text += ` <b>a pair of`
      } else {
        text += ` <b>${this.number}`
      }

      text += ` ${this.pluralized}</b>`

      if (!this.owner.parts.penis.has) {
        if (this.owner.parts.vagina.has) {
          // prettier-ignore
          text += ` — it somehow allows your ${this.owner.parts.vagina.pluralized} to produce semen.`
        } else {
          text += ` — without any outlet for semen, you are constantly aroused.`
        }
      } else {
        text += `.`
      }
    } else if (this.owner.parts.penis.has) {
      if (this.owner.parts.penis.quantity > 1) {
        text += `They are `
      } else {
        text += `It's `
      }

      text += `<b>lacking a scrotum</b> and can't produce semen.`
    }

    return Part.trim(text)
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
    return Part.random(["ball", "testicle"])
  }

  get plural() {
    return Part.random(["balls", "testicles"])
  }

  get scrotumSize() {
    return this.quantity * this.size
  }

  get adjective() {
    if (!this.stats.external) {
      return "internal"
    }

    if (this.scrotumSize < 4) {
      return "tight"
    } else if (this.scrotumSize < 8) {
      return Part.random(["heavy", "saggy"])
    } else {
      return `monstrous`
    }
  }
}
