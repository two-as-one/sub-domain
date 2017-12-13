import Chance from "chance"
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

    this.name = ""
  }

  get savedAttribute() {
    return "stats"
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

  //STRENGTH - Main attribute for inflicting physical damage and overpowering opponents
  // AttackPower      100%
  // pinAttackPower   100%
  // pinDefence        50%
  get strength() {
    return this.stats.str + this.stats.lvl * LEVEL_STAT_SCALE
  }

  //STAMINA - Main attribute for physical fortitude, allows you to last longer in a fisticuffs
  // maxHP            100%
  // maxLust           25%
  get stamina() {
    return this.stats.stam + this.stats.lvl * LEVEL_STAT_SCALE
  }

  //CHARISMA - Main attribute for mental and sensual warfare
  // arousePower      100%
  get charisma() {
    return this.stats.char + this.stats.lvl * LEVEL_STAT_SCALE
  }

  //WILLPOWER - Main attribute for mental fortitude, allows you to last longer in the game of love
  // maxLust          100%
  // maxHP             25%
  get willpower() {
    return this.stats.will + this.stats.lvl * LEVEL_STAT_SCALE
  }

  //DEXTERITY - Useful for a variety of roles
  // attackPower       25%
  // arousePower       25%
  // deflection        50%
  // pinAttackPower    50%
  // pinDefence       100%
  get dexterity() {
    return this.stats.dex + this.stats.lvl * LEVEL_STAT_SCALE
  }

  // Life totals
  //------------

  get maxHP() {
    return Math.ceil(this.stamina + this.willpower * 0.25) * HP_SCALE
  }

  get currentHP() {
    return Math.max(0, this.maxHP - this.stats.dmg)
  }

  //normalized HP on a scale from 0 to 1
  get normalizedHP() {
    return this.currentHP / this.maxHP
  }

  //normalized hp from 0 - 100
  get healthBar() {
    return this.normalizedHP * 100
  }

  get maxLust() {
    return Math.ceil(this.willpower + this.stamina * 0.25) * HP_SCALE
  }

  get currentLust() {
    return Math.min(this.maxLust, this.stats.lust)
  }

  //normalized lust on a scale from 0 to 1
  get normalizedLust() {
    return this.currentLust / this.maxLust
  }

  //normalized lust from 0 - 100
  get lustBar() {
    return this.normalizedLust * 100
  }

  // Derived stats
  //--------------

  //damage inflicted by physical attacks
  get attackPower() {
    return this.strength + this.dexterity * 0.25
  }

  //lust reduces physical damage by up to 50%, multiplier from 1 to 0.5
  get lustDamagePenality() {
    return 1 - this.normalizedLust / 2
  }

  //ability to deflect a portion of physical damage received
  get deflection() {
    return this.dexterity * 0.5
  }

  //power of arousal inflicted to opponents
  get arousePower() {
    return this.charisma + this.dexterity * 0.25
  }

  //ability to withstand arousal received
  get numbness() {
    return 0
  }

  //ability to pin down targets
  get pinAttackPower() {
    return this.strength + this.dexterity * 0.5
  }

  //ability to escape from a grapple
  get pinDefence() {
    return this.strength * 0.5 + this.dexterity
  }

  get alive() {
    return this.currentHP > 0
  }

  get orgasmed() {
    return this.maxLust === this.currentLust
  }

  // how much XP is this entity worth?
  get XPWorth() {
    return (
      this.strength +
      this.stamina +
      this.charisma +
      this.willpower +
      this.dexterity
    )
  }

  //introduce a level of randomness to certain moves, returns a multiplier to be applied to other values
  get variance() {
    const variance = 20 //as a percentage
    return Math.random() * (variance * 2 / 100) + 0.9
  }

  get wantsToFuck() {
    return Math.random() < this.normalizedLust
  }

  // Methods
  //--------

  //attack a target, lust reduces the damage dealt
  attack(target) {
    return target.damage(this.attackPower * this.lustDamagePenality)
  }

  damage(amount) {
    amount = Entity.damageFormula(amount, this.deflection, this.variance)
    this.stats.dmg += amount

    return amount
  }

  //seduce the target, arousal affected by how much the target likes the part and armor worn
  seduce(target, part) {
    return target.arouse(this.arousePower * target.likes(part))
  }

  //fuck the target, arousal affected by how much the target likes the part
  fuck(target, ownPart, targetPart) {
    return target.arouse(
      this.arousePower *
        target.likes(ownPart) *
        target.sensitivity(targetPart) *
        2
    )
  }

  arouse(amount) {
    amount = Entity.damageFormula(amount, this.numbness, this.variance)
    this.stats.lust += amount

    return amount
  }

  //check whether this entity accepts a specific position that was submitted
  submit(position) {
    return (
      this.normalizedLust *
        this.likes(position.player) *
        this.sensitivity(position.enemy) >
      0.2
    )
  }

  //attempt to grapple a target
  grapple(target) {
    if (target.orgasmed || !target.alive) {
      return true //unable to resist
    }

    return (
      Math.random() <
      this.pinAttackPower / (this.pinAttackPower + target.pinDefence)
    )
  }

  //struggle against a grapple
  struggle(target) {
    return (
      Math.random() <
      this.pinDefence / (this.pinAttackPower + target.pinDefence)
    )
  }

  //attempt to flee from a target
  flee(target) {
    return Math.random() < this.dexterity / (this.dexterity + target.dexterity)
  }

  heal(amount) {
    this.stats.dmg -= amount
    this.stats.dmg = Math.max(0, this.stats.dmg)
  }

  soothe(amount) {
    this.stats.lust -= amount
    this.stats.lust = Math.max(0, this.stats.lust)
  }

  //multiplier that affects how successful a seduction will be
  //extend this when creating a new entity
  likes(part) {
    return 1
  }

  //get the sensitivity of a part
  //extend this when creating a new entity
  sensitivity(part) {
    return 0.5
  }

  //extend this method to return the diameter of a body part
  getDiameter(part) {
    return 0
  }

  //method that applies a transformation to the player
  //extend this method if the creature can infect the player
  infect(player) {}

  //measure difficulty of a target
  // 2+   success unlikely
  // 1    even match
  // 0.5- trivial
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

  //gives random stats to this entity from a list of possible options
  giveRandomStats(number, list) {
    if (!list) {
      list = ["str", "stam", "dex", "will", "char"]
    }

    for (let i = 0; i < number; i++) {
      const stat = chance.pickone(list)

      if (stat in this.stats) {
        this.stats[stat] += 1
      }
    }
  }

  static damageFormula(attack, defence, variance) {
    return Math.round(attack * (attack / (attack + defence)) * variance)
  }

  // Capability flags
  //-----------------

  has(part) {
    return false
  }
}
