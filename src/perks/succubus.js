import Perk from "./_super"

export default class Succubus extends Perk {
  get name() {
    return "succubus"
  }

  get description() {
    return `You gain nourishment from life.`
  }

  get effect() {
    return `Consuming spunk restores hunger.`
  }

  get available() {
    return true
  }
}
