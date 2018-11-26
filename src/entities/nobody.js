import Entity from "./_super"

// this entity is used as a fallback [foe] when the current scene has none
export default class Nobody extends Entity {
  constructor(game) {
    super(game, {
      lvl: 1,
      name: "nobody",
      gender: "neutral",
    })
  }
}
