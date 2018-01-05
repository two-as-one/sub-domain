import Perk from "./_super"

export default class Conjoined extends Perk {
  get name() {
    return "conjoined"
  }

  get description() {
    return `[WIP] You share your body with someone else.`
  }

  get effect() {
    return `You have a second head on your shoulders with its own personality.`
  }

  get available() {
    return true
  }
}
