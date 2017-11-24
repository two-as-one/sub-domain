import Weapon from "./_super"

export default class Fists extends Weapon {
  get name() {
    return "your fists"
  }

  get equippedDescription() {
    return `Without any weapons equipped, you resort to using <b>your fists</b>.`
  }
}
