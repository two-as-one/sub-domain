import Entity from "./_super"

// female test entity
export default class Alice extends Entity {
  constructor(game) {
    super(game, {
      lvl: 1,
      name: "Alice",
      gender: "female",
      title: "female person",
      parts: {
        breasts: { size: 5 },
        nipples: { size: 0.4 },
        vagina: { quantity: 1 },
      },
    })
  }
}
