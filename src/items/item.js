export default class Item {
  constructor() {
    this.isConsumable = false
    this.isWeapon = false
    this.isArmor = false
  }

  get description() {
    return ""
  }

  get name() {
    return "item"
  }

  //this factory method creates an items of the correct type based on file name
  //example: Item.create('rock')
  static create(name) {
    const req = require.context("./", true, /\.js$/)
    const keys = req.keys()
    const match = keys.find(string => string.includes(name))

    let Constrcutor
    if (match) {
      Constrcutor = req(match).default
    } else {
      Constrcutor = Item
    }

    const item = new Constrcutor(name)
    item.fileName = name

    return item
  }
}
