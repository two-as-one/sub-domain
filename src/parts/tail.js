import Part from "./_super"

export default class Tail extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("tail")

    // TODO - adjectives
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
    })
  }

  get description() {
    if (this.has) {
      switch (this.type) {
        case "bovine":
          return `a slender **bovine tail** — swaying back and forth. It has your skin tone and ends in a tuft of hair.`
      }
    }

    return ""
  }
}
