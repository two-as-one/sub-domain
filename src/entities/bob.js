import Entity from "./_super"

// male test entity
export default class Bob extends Entity {
  constructor(game) {
    super(game, {
      lvl: 1,
      name: "Bob",
      gender: "male",
      title: "male person",
      parts: {
        penis: { quantity: 1 },
        balls: { quantity: 2 },
      },
    })
  }
}
