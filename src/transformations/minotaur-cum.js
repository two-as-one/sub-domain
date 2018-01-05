import Transformation from "./_super"

/**
 * Effects of minotaur cum
 */
export default class MinotaurCum extends Transformation {
  get name() {
    return "minotaur cum"
  }

  get available() {
    return true
  }

  apply() {
    return this.owner.transform.pickOne([
      "grow four breasts",
      "increase breast size",
      "increase breast milk",
      "increase penis size",
      "change tail to bovine",
      "grow bovine tail",
      "grow a bovine udder",
      "increase udder size",
      "increase nipple size",
      "grow an extra nipple"
    ])
  }
}
