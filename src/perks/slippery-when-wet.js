import Perk from "./_super"

export default class SlipperyWhenWet extends Perk {
  get name() {
    return "slippery when wet"
  }

  get description() {
    return `Your orifices are particularly wet, even when you're not turned on.`
  }

  get effect() {
    return `You/have an easier time slipping out of a grapple.`
  }
}
