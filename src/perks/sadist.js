import Perk from "./_super"

export default class Sadist extends Perk {
  get name() {
    return "sadist"
  }

  get description() {
    return `You are obsessed with dealing pain.`
  }

  get effect() {
    return `Deal bonus damage based on how lusty you/are.`
  }
}
