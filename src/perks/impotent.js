import Perk from "./_super"

export default class Impotent extends Perk {
  get name() {
    return "impotent"
  }

  get description() {
    return `[your.penis]~>be limp and useless.`
  }

  get effect() {
    return `
      You can't get hard and [your.penis] can't be used for any sexual moves.`
  }

  get available() {
    return this.player.penis.has
  }
}
