import Perk from "./_super"

export default class Subbie extends Perk {
  get name() {
    return "subbie"
  }

  get description() {
    return `You exude an aura of submissiveness.`
  }

  get effect() {
    return `Others are more likely to accept when you offer them your body.`
  }

  get available() {
    return !this.player.perks.has("total sub")
  }
}
