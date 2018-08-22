import Entity from "./_super"

// this entity is used as a fallback [foe] when the current scene has none
export default class Nobody extends Entity {
  constructor() {
    super({
      lvl: 1
    })

    this.name = "nobody"
    this.gender = "none" /* it/its/itself */
  }
}
