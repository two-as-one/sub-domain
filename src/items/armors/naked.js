import Weapon from "./_super"

export default class Naked extends Weapon {
  get name() {
    return "the absence of clothing"
  }

  get equippedDescription() {
    return `
      You are not wearing any armor or clothing, you are entirely **naked**.`
  }

  get arousePower() {
    return 5
  }
}
