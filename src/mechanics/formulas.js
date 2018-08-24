/**
 * formula for calculating damage
 */
export class DamageFormula {
  constructor(power, defence) {
    this.power = power
    this.defence = defence
    this.variance = 0.2
  }

  // get lowest possible roll
  get min() {
    return this.calc(0)
  }

  // get highest possible roll
  get max() {
    return this.calc(1)
  }

  // the damage formula
  get formula() {
    const [a, d] = [this.power, this.defence]
    return a * (a / (a + d))
  }

  // calculate a result given a random seed
  calc(roll = 0) {
    // roll must be between 0 and 1
    roll = Math.max(Math.min(roll, 1), 0)

    // apply variance to roll
    roll = roll * (this.variance * 2) + (1 - this.variance)

    return Math.round(this.formula * roll)
  }

  // roll the die and get a result
  roll() {
    return this.calc(Math.random())
  }
}

/**
 * formula for calculating a chance
 */
export class ChanceFormula {
  constructor(power, defence) {
    this.power = power
    this.defence = defence
  }

  get chance() {
    return `${Math.floor(this.formula * 100)}%`
  }

  get formula() {
    const [a, d] = [this.power, this.defence]
    return a / (a + d)
  }

  calc(roll = 0) {
    return roll < this.formula
  }

  roll() {
    return this.calc(Math.random())
  }
}

/**
 * Formula for calculating attack damage
 * @extends {DamageFormula}
 */
export class Attack extends DamageFormula {
  constructor(attacker, defender) {
    super(attacker.attackPower, defender.deflection)
  }
}

/**
 * Formula for calculating seduction
 * @extends {DamageFormula}
 */
export class Seduce extends DamageFormula {
  constructor(part, defender) {
    super(part.owner.arousePower * defender.likes(part), defender.numbness)
  }
}

/**
 * Formula for calculating fucking
 * @extends {DamageFormula}
 */
export class Fuck extends DamageFormula {
  constructor(partA, partB) {
    const a = partA.owner
    const b = partB.owner

    super(a.arousePower * b.likes(partA) * partB.sensitivity * 2, b.numbness)
  }
}

/**
 * Formula for grappling
 * @extends {ChanceFormula}
 */
export class Grapple extends ChanceFormula {
  constructor(attacker, defender) {
    if (defender.orgasmed || !defender.alive) {
      super(0, 1)
    } else {
      super(attacker.pinAttackPower, defender.pinDefence)
    }
  }
}

/**
 * Formula for struggling out of a grapple
 * @extends {ChanceFormula}
 */
export class Struggle extends ChanceFormula {
  constructor(attacker, defender) {
    super(attacker.pinDefence, defender.pinDefence)
  }
}

/**
 * Formula for fleeing combat
 * @extends {ChanceFormula}
 */
export class Flee extends ChanceFormula {
  constructor(attacker, defender) {
    super(attacker.dexterity, defender.dexterity)
  }
}

/**
 * Formula for determining if an entity is interested
 * @extends {ChanceFormula}
 */
export class Interested extends ChanceFormula {
  constructor(who) {
    super(who.lustNormalized, 1)
  }
}
