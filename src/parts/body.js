import Part from "./_super"

export default class Body extends Part {
  get description() {
    return `<p>${this.heightDescription} You weigh ${this.weight}.</p>`
  }

  get heightDescription() {
    if (this.stats.size < 150) {
      return `You are self-conscious about your diminutive size of ${
        this.height
      }.`
    } else if (this.stats.size < 160) {
      return `You are not particularly tall at ${this.height} in height.`
    } else if (this.stats.size < 180) {
      return `You are an average ${this.height} tall.`
    } else if (this.stats.size < 200) {
      return `You are taller than most people at ${this.height}.`
    } else {
      return `People have to look up at your towering height of ${this.height}.`
    }
  }

  get saveKey() {
    return "player-part-body"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1,
      size: 170, //in cm
      weight: 65, //in kg
      hipWidth: 10
      //TODO body fat, hip width, skin
    })
  }

  get singular() {
    return "body"
  }

  get plural() {
    return "bodies"
  }

  get adjective() {
    return ""
  }

  get height() {
    return Part.toFt(this.stats.size)
  }

  get weight() {
    return Part.toLbs(this.stats.weight)
  }
}
