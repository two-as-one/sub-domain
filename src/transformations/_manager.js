import Chance from "chance"
const chance = new Chance()

export default class TransformationManager {
  constructor(owner) {
    this.owner = owner

    this._TRANSFORMATIONS = []

    //load all transformations
    const req = require.context("./", true, /^(?!\.\/_).+\.js/)
    req.keys().forEach(key => {
      const Transformation = req(key).default
      this._TRANSFORMATIONS.push(new Transformation(this.owner))
    })
  }

  //picks a random transformation out of a list of transformation names
  pickOne(list) {
    list = list
      .map(name => this._TRANSFORMATIONS.find(item => item.name === name))
      .filter(item => item)
      .filter(item => item.available)

    if (!list.length) {
      return ""
    }

    const choice = chance.pickone(list)

    if (!choice) {
      return ""
    }

    return choice.apply()
  }
}
