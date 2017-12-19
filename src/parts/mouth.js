import Part from "./_super"

export default class Mouth extends Part {
  get saveKey() {
    return "player-part-mouth"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 1,
      sensitivity: 0.5,
      size: 1
    })
  }

  get seductionMessage() {
    return `
      <p>
        You spread ${this.one} wide open with your tongue sticking out.
        Bringing two fingers to your lips and closing them around it, you hungrily suckle them.
      </p>`
  }

  get canSeduce() {
    return true
  }

  get singular() {
    return Part.random(["mouth"])
  }

  get plural() {
    return Part.random(["mouths"])
  }

  get adjective() {
    return ""
  }
}
