import Chance from "chance"
import Grammar from "grammar/grammar"

import {
  Anus,
  Balls,
  Body,
  Breasts,
  Face,
  Feet,
  Hands,
  Head,
  Mouth,
  Nipples,
  Penis,
  Tail,
  Udder,
  Vagina
} from "parts/_all"

const chance = new Chance()

const STAT_BASE = 5
const LEVEL_STAT_SCALE = 1
const HP_SCALE = 5

/**
 * Entity
 * This is the base class from which all entities must inherit from
 * refer to README.md for instructions on how to make custom entities
 */
export default class Entity {
  constructor(config = {}) {
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

    this.stored = Object.assign({}, this.defaults, config)

    this.parts = {
      anus: new Anus(this),
      balls: new Balls(this),
      body: new Body(this),
      breasts: new Breasts(this),
      face: new Face(this),
      feet: new Feet(this),
      hands: new Hands(this),
      head: new Head(this),
      mouth: new Mouth(this),
      nipples: new Nipples(this),
      penis: new Penis(this),
      tail: new Tail(this),
      udder: new Udder(this),
      vagina: new Vagina(this)
    }

    // make parts directly accessible on entity, ie `entity.hands`
    Object.keys(this.parts).forEach(key => (this[key] = this.parts[key]))
  }

  get defaults() {
    return {
      lvl: 1,
      str: STAT_BASE,
      stam: STAT_BASE,
      will: STAT_BASE,
      char: STAT_BASE,
      dex: STAT_BASE,
      prc: STAT_BASE,
      dmg: 0,
      lust: 0
    }
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
   * healthMax        100%
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
   * healthMax         25%
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

  /**
   * PERCEPTION - gives information about actions
   */
  get perception() {
    return this.stored.prc + this.stored.lvl * LEVEL_STAT_SCALE
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
    return (this.strength + this.dexterity * 0.25) * this.lustPowerPenality
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

  // Methods
  //--------

  /**
   * Damage this entity
   * @param  {Number} amount - The damage to apply
   */
  damage(amount = 0) {
    this.health -= Math.ceil(amount)
    this.damaged = amount

    return amount
  }

  /**
   * Arouse this entity by an amount
   * @param  {Number} amount - The amount of lust to arouse by
   * @return {Number}        The actual lust that was inflicted
   */
  arouse(amount = 0) {
    this.lust += Math.ceil(amount)
    this.aroused = amount

    return amount
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

  // Capability flags
  //-----------------

  get has() {
    const out = {}

    Object.keys(this.parts).forEach(key => (out[key] = this[key].has))

    return out
  }
}

Grammar.mix(Entity)
