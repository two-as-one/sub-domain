import Chance from "chance"
import Grammar from "utils/grammar"
import Saveable from "save/saveable"

const chance = new Chance()

const LEVEL_STAT_SCALE = 1
const HP_SCALE = 5

/**
 * Entity
 * This is the base class from which all entities must inherit from
 * refer to README.md for instructions on how to make custom entities
 */
export default class Entity extends Saveable {
  constructor() {
    super()

    //name is used by specific NPC's, leave this blank if an entity has no known name
    //eg: 'Bob', 'Alice'
    this.name = ""

    //the title refers to the category of this entity
    //eg: 'Minotaur', 'Goblin'
    this.title = "creature"

    //the gender of this creature
    //male/female/neutral/none
    //he/she/they/it
    this.gender = "none"

    //whether to refer to this entity in the first, second or third person
    //third person used for NPC's
    //second person used for the player
    this.person = "third"

    //whether this entity is actually multiple people
    this.multiple = false
  }

  get defaults() {
    return Object.assign(super.defaults, {
      lvl: 1,
      str: 5,
      stam: 5,
      will: 5,
      char: 5,
      dex: 5,
      dmg: 0,
      lust: 0
    })
  }

  // Base stats
  //-----------

  /**
   * STRENGTH - Main attribute for inflicting physical damage and overpowering opponents
   * AttackPower      100%
   * pinAttackPower   100%
   * pinDefence        50%
   */
  get strength() {
    return this.stored.str + this.stored.lvl * LEVEL_STAT_SCALE
  }

  /**
   * STAMINA - Main attribute for physical fortitude, allows you to last longer in a fisticuffs
   * healthMax            100%
   * lustMax           25%
   */
  get stamina() {
    return this.stored.stam + this.stored.lvl * LEVEL_STAT_SCALE
  }

  /**
   * CHARISMA - Main attribute for mental and sensual warfare
   * arousePower      100%
   */
  get charisma() {
    return this.stored.char + this.stored.lvl * LEVEL_STAT_SCALE
  }

  /**
   * WILLPOWER - Main attribute for mental fortitude, allows you to last longer in the game of love
   * lustMax          100%
   * healthMax             25%
   */
  get willpower() {
    return this.stored.will + this.stored.lvl * LEVEL_STAT_SCALE
  }

  /**
   * DEXTERITY - Useful for a variety of roles
   * attackPower       25%
   * arousePower       25%
   * deflection        50%
   * pinAttackPower    50%
   * pinDefence       100%
   */
  get dexterity() {
    return this.stored.dex + this.stored.lvl * LEVEL_STAT_SCALE
  }

  // Life totals
  //------------

  /**
   * Entity health, when it drops to 0 they fall unconscious
   * @type {Number}
   */
  get health() {
    return Math.min(
      this.healthMax,
      Math.max(0, this.healthMax - this.stored.dmg)
    )
  }

  set health(val) {
    if (typeof val === "number" && !Number.isNaN(val)) {
      //can't drop below 0
      if (val < 0) {
        val = 0
      }
      //can't go above healthMax
      if (val > this.healthMax) {
        val = this.healthMax
      }
      this.stored.dmg = this.healthMax - val
    }
  }

  /** maximum health */
  get healthMax() {
    return Math.ceil(this.stamina + this.willpower * 0.25) * HP_SCALE
  }

  /** health as a normalized value between 0 and 1 */
  get healthNormalized() {
    return this.health / this.healthMax
  }

  /** health as a percentage from 0 to 100 */
  get healthPercentage() {
    return this.healthNormalized * 100
  }

  /**
   * Entity lust, the higher it goes the hornier they get!
   * @type {Number}
   */
  get lust() {
    return this.stored.lust
  }

  set lust(val) {
    if (typeof val === "number" && !Number.isNaN(val)) {
      //can't drop below 0
      if (val < 0) {
        val = 0
      }
      //can't go above lustMax
      if (val > this.lustMax) {
        val = this.lustMax
      }
      this.stored.lust = val
    }
  }

  /** maximum lust */
  get lustMax() {
    return Math.ceil(this.willpower + this.stamina * 0.25) * HP_SCALE
  }

  /** lust as a normalized value between 0 and 1 */
  get lustNormalized() {
    return this.lust / this.lustMax
  }

  /** lust as a percentage from 0 to 100 */
  get lustPercentage() {
    return this.lustNormalized * 100
  }

  // Derived stats
  //--------------

  /** damage inflicted by physical attacks */
  get attackPower() {
    return this.strength + this.dexterity * 0.25
  }

  /**
   * The ability to deflect a portion of physical damage received
   * @return {Number} A multiplier from 0 to 1
   */
  get deflection() {
    return this.dexterity * 0.5
  }

  /** lust reduces physical damage by up to 50%, multiplier from 1 to 0.5 */
  get lustPowerPenality() {
    return 1 - this.lustNormalized / 2
  }

  /** power of arousal inflicted to opponents */
  get arousePower() {
    return this.charisma + this.dexterity * 0.25
  }

  /**
   * The ability to withstand incoming arousal
   * @return {Number} A multiplier from 0 to 1
   */
  get numbness() {
    return 0
  }

  /** ability to pin down targets */
  get pinAttackPower() {
    return this.strength + this.dexterity * 0.5
  }

  /** ability to escape from a grapple */
  get pinDefence() {
    return this.strength * 0.5 + this.dexterity
  }

  /** check whether this entity is alive */
  get alive() {
    return this.health > 0
  }

  /** check whether this entity has reached orgasm */
  get orgasmed() {
    return this.lustMax === this.lust
  }

  /** how much XP is this entity worth? */
  get XPWorth() {
    return (
      this.strength +
      this.stamina +
      this.charisma +
      this.willpower +
      this.dexterity
    )
  }

  /** Introduce a level of randomness to certain moves */
  get variance() {
    return 0.2
  }

  /** true if the entity intends to fuck */
  get wantsToFuck() {
    return Math.random() < this.lustNormalized
  }

  // Methods
  //--------

  /**
   * Attack another entity and damage it
   * Damage reduced by current lust
   * @param  {Entity} target - The entity to attack
   * @return {Number}        The amount of damage that was dealt
   */
  attack(target) {
    return target.damage(this.attackPower * this.lustPowerPenality)
  }

  /**
   * Damage this entity
   * Damage reduced by deflection and variance
   * @param  {Number} amount - The damage to apply
   * @return {Number}        The actual damage that was applied
   */
  damage(amount = 0) {
    amount = Entity.damageFormula(amount, this.deflection, this.variance)
    this.health -= Math.ceil(amount)

    return amount
  }

  /**
   * Seduce another entity and arouse it
   * Arousal influenced by how much they like the body part used
   * @param  {Entity} target - The entity to seduce
   * @param  {Part} part     - The body part used to seduce
   * @return {Number}        The amount of lust inflicted
   */
  seduce(target, part) {
    return target.arouse(this.arousePower * target.likes(part))
  }

  /**
   * Fuck another entity
   * Arousal influenced by how much the other entity like the body part used and how sensitive their own body part is
   * @param  {Entity} target   - The entity to fuck
   * @param  {Part} ownPart    - The body part used to fuck
   * @param  {Part} targetPart - The body part that was fucked
   * @return {Number}          The amount of lust inflicted
   */
  fuck(target, ownPart, targetPart) {
    return target.arouse(
      this.arousePower *
        target.likes(ownPart) *
        target.sensitivity(targetPart) *
        2
    )
  }

  /**
   * Arouse this entity by an amount
   * Arousal reduced by numbness and variance
   * @param  {Number} amount - The amount of lust to arouse by
   * @return {Number}        The actual lust that was inflicted
   */
  arouse(amount = 0) {
    amount = Entity.damageFormula(amount, this.numbness, this.variance)
    this.lust += Math.ceil(amount)

    return amount
  }

  /**
   * check whether this entity accepts a specific position that was submitted
   * @param  {Object} position - Position object provided by the encounter
   * @return {Boolean}         true if the position was accepted
   */
  submit(position) {
    return (
      this.lustNormalized *
        this.likes(position.player) *
        this.sensitivity(position.enemy) >
      0.2
    )
  }

  /**
   * Grapple a target
   * @param  {Entity} target   - The entity to grapple
   * @return {Boolean}         true if the grapple was successful
   */
  grapple(target) {
    //unable to resist
    if (target.orgasmed || !target.alive) {
      return true
    }

    return (
      Math.random() <
      this.pinAttackPower / (this.pinAttackPower + target.pinDefence)
    )
  }

  /**
   * Struggle out of a grapple
   * @param  {Entity} target   - The entity to struggle against
   * @return {Boolean}         true if the struggle was successful
   */
  struggle(target) {
    return (
      Math.random() <
      this.pinDefence / (this.pinAttackPower + target.pinDefence)
    )
  }

  /**
   * attempt to flee from a target
   * @param  {Entity} target   - The entity to flee from
   * @return {Boolean}         true if fleeing was successful
   */
  flee(target) {
    return Math.random() < this.dexterity / (this.dexterity + target.dexterity)
  }

  /**
   * Heal this entity by an amount
   * @param  {Number} amount - The amount of health to restore
   * @return {Number}        The actual amount of health restored
   */
  heal(amount) {
    amount = Math.ceil(amount)

    const previous = this.health

    this.health += amount

    return this.health - previous
  }

  /**
   * Soothe this entity by an amount, reducing lust
   * @param  {Number} amount - The amount of lust to soothe
   * @return {Number}        The actual amount of lust soothed
   */
  soothe(amount) {
    amount = Math.ceil(amount)

    const previous = this.lust

    this.lust -= amount

    return previous - this.lust
  }

  /**
   * Determines how much this entity likes the given part
   * Extend this with a custom function when implementing bespoke entities
   * @param  {Part} part - The part to check
   * @return {Number}    A multiplier to be applied where relevant
   */
  likes(part) {
    return 1
  }

  /**
   * Determines how sensitive a given part is
   * Extend this with a custom function when implementing bespoke entities
   * @param  {Part} part - The part to check
   * @return {Number}    A multiplier to be applied where relevant
   */
  sensitivity(part) {
    return 0.5
  }

  /**
   * Find the diameter of a given part, used by dilation
   * Extend this with a custom function when implementing bespoke entities
   * @param  {Part} part - The part to check
   * @return {Number}    The diameter of the part
   */
  getDiameter(part) {
    return 0
  }

  /**
   * Method that applies a transformation to the player
   * Extend this with a custom function when implementing bespoke entities
   * @param  {Entity} player - The player to infect
   * @return {String}        A string describing the transformation
   */
  infect(player) {}

  /**
   * measure difficulty of a target
   * @param  {Entity} target - The target to compare against
   * @return {Number}        A number describing the difficulty:
   *                           >2   success unlikely
   *                           1    even match
   *                           <0.5 trivial
   */
  difficulty(target) {
    return (
      (target.strength +
        target.stamina +
        target.charisma +
        target.willpower +
        target.dexterity) /
      (this.strength +
        this.stamina +
        this.charisma +
        this.willpower +
        this.dexterity)
    )
  }

  /**
   * Gives random stats to this entity from a list of possible options
   * @param  {Number} number      - The number of stats to distribute
   * @param  {Array[String]} list - The list of possible stats to increase
   */
  giveRandomStats(number, list) {
    if (!list) {
      list = ["str", "stam", "dex", "will", "char"]
    }

    for (let i = 0; i < number; i++) {
      const stat = chance.pickone(list)

      if (stat in this.stored) {
        this.stored[stat] += 1
      }
    }
  }

  /**
   * Formula for calculating damage
   * @param  {Number} attack   - the incoming attack damage
   * @param  {Number} defence  - the level of defence
   * @param  {Number} variance - a level of variance
   * @return {Number}          The actual damage inflicted
   */
  static damageFormula(attack = 0, defence = 0, variance = 0) {
    return Math.round(
      attack * (attack / (attack + defence)) * Entity.vary(variance)
    )
  }

  /** Formula that varies a number */
  static vary(variance) {
    return Math.random() * (variance * 2) + (1 - variance)
  }

  // Capability flags
  //-----------------

  has(part) {
    return false
  }
}

Grammar.mix(Entity)

if (process.env.dev) {
  window.Entity = Entity
}
