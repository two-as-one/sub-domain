import Part from "./_super"

export default class Tail extends Part {
  get saveKey() {
    return "player-part-tail"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 0,
      type: "human"
    })
  }

  get type() {
    return this.stats.type
  }

  set type(val) {
    this.stats.type = val
  }

  get description() {
    if (this.has) {
      switch (this.stats.type) {
        case "bovine":
          return `a slender <b>bovine tail</b> — swaying back and forth. It has your sking tone and ends in a tuft of hair.`
      }
    }

    return ""
  }

  get singular() {
    return Part.random(["tail"])
  }

  get plural() {
    return Part.random(["tails"])
  }

  get adjective() {
    return ""
  }
}
