import Perk from "./_super"

export default class Masochist extends Perk {
  get name() {
    return "masochist"
  }

  get description() {
    return `You derive pleasure from pain.`
  }

  get effect() {
    return `When taking damage, absorb some of it as lust.`
  }

  get available() {
    return true
  }
}
