import Entity from "./_super"

// ungendered test entity
export default class Dave extends Entity {
  constructor(game) {
    super(game, {
      lvl: 1,
      name: "Dave",
      gender: "none",
      title: "slime",
      parts: {
        penis: { quantity: 0 },
        balls: { quantity: 0 },
        anus: { quantity: 0 },
        arms: { quantity: 0 },
        legs: { quantity: 0 },
        vagina: { quantity: 0 },
        breasts: { quantity: 0 },
        butt: { quantity: 0 },
      },
    })
  }
}
