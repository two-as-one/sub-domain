import Grammar from "utils/grammar"
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
        You spread ${this.one} wide open with your tongue sticking out.
        Bringing two fingers to your lips and closing them around it, you hungrily suckle them.`
  }

  get canSeduce() {
    return true
  }

  get singular() {
    return Grammar.random(["mouth"])
  }

  get plural() {
    return Grammar.random(["mouths"])
  }

  get adjective() {
    return ""
  }
}
