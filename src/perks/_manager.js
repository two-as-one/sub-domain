import Saveable from "save/saveable"

export default class PerkManager extends Saveable {
  constructor(owner) {
    super()
    this.owner = owner

    this._PERKS = []

    //load all transformations
    const req = require.context("./", true, /^(?!\.\/_).+\.js/)
    req.keys().forEach(key => {
      const Perk = req(key).default
      this._PERKS.push(new Perk(this.owner))
    })

    this._PERKS.sort((a, b) => a.name < b.name)
  }

  get saveKey() {
    return "player-perks"
  }

  get savedAttribute() {
    return "data"
  }

  get defaults() {
    return {}
  }

  //check whether the player has a perk
  has(name) {
    return Boolean(this.exists(name) && this.data[name])
  }

  //grant a perk to the player
  grant(name) {
    if (this.exists(name)) {
      this.data[name] = true
    }
  }

  //revoke a perk
  revoke(name) {
    if (this.exists(name)) {
      delete this.data[name]
    }
  }

  //check whether a perk exists
  exists(name) {
    return Boolean(this._PERKS.find(perk => perk.name === name))
  }

  //list all available perks
  get listAvailable() {
    return this._PERKS
      .filter(perk => perk.available)
      .filter(perk => !this.has(perk.name))
  }

  //list all perks the player has
  get listGranted() {
    return this._PERKS.filter(perk => this.has(perk.name))
  }
}
