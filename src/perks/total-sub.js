import Perk from "./_super"

export default class TotalSub extends Perk {
  get name() {
    return "total sub"
  }

  get description() {
    return `You are a total slut.`
  }

  get effect() {
    return `Others will always accept when you offer them your body but you don't get to choose how you submit and once you do, there's no escaping till they are done with you!`
  }

  get available() {
    return this.player.perks.has("subbie")
  }
}
