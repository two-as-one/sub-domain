import Perk from "./_super"

export default class BlessingOfPhallus extends Perk {
  get name() {
    return "blessing of phallus"
  }

  get description() {
    return `You have been blessed by Phallus`
  }

  get effect() {
    return `[your:penis] can never shrink or be removed.`
  }

  get gift() {
    return true
  }
}
