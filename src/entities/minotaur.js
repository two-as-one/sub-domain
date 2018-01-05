import Entity from "./_super"

export default class Minotaur extends Entity {
  constructor() {
    super()

    this.stats.lvl = 3

    this.title = "minotaur"

    this.giveRandomStats(this.stats.lvl * 2, ["str", "stam"])
  }

  likes(part) {
    switch (part) {
      case "anus":
      case "vagina":
        return 1
      case "breasts":
      case "mouth":
        return 0.75
      case "penis":
        return 0.25
      default:
        return 0.5
    }
  }

  has(part) {
    switch (part) {
      case "penis":
      case "anus":
      case "hands":
      case "mouth":
        return true
      default:
        return false
    }
  }

  getDiameter(partName) {
    switch (partName) {
      case "penis":
        return 3.5
      default:
        return 0
    }
  }

  infect(player) {
    return player.transform.pickOne(["minotaur cum"])
  }
}
