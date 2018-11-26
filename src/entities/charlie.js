import Entity from "./_super"

// gender neutral test entity
export default class Charlie extends Entity {
  constructor(game) {
    super(game, {
      lvl: 1,
      name: "Charlie",
      gender: "neutral",
      title: "gender-neutral person",
      parts: {
        penis: { quantity: 1, size: 4 },
        balls: { quantity: 2 },
        breasts: { size: 3 },
        nipples: { size: 0.3 },
      },
    })
  }
}
