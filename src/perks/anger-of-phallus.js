import Perk from "./_super"

export default class AngerOfPhallus extends Perk {
  get name() {
    return "anger of phallus"
  }

  get description() {
    return `You have angered Phallus`
  }

  get effect() {
    return `You will never be able to grow a cock.`
  }

  get gift() {
    return true
  }
}
