import Entity from "entities/_super"
import G from "grammar/grammar"
import Inventory from "./inventory"
import PerkManager from "perks/_manager"
import TransformationManager from "transformations/_manager"
import { persist } from "save/saveable"
import statBarTemplate from "templates/stat-bar.hbs"

export default class Player extends Entity {
  constructor() {
    super()

    this.name = ""
    this.title = "hero"
    this.person = "second"
    this.gender = "neutral"

    this.inventory = new Inventory(this)

    // restore & persist state of player and parts
    persist(this, "player-stats")
    Object.keys(this.parts).forEach(key =>
      persist(this[key], `player-part-${key}`)
    )

    this.transform = new TransformationManager(this)
    this.perks = new PerkManager(this)
  }

  /**
   * hook for the text parser
   * describes `you` or `both of you` in case of conjoinment
   */
  get who() {
    if (this.head.quantity === 2) {
      return G.random(["both of you", "you both", "you", "you", "you"])
    } else {
      return super.who
    }
  }

  // shortcut to player.who
  get you() {
    return this.who
  }

  // Saving
  //-------

  get defaults() {
    return Object.assign(super.defaults, {
      xp: 0,
      hunger: 11 //starts at 11 so that it takes 2 explorations to become hungry
    })
  }

  // Base Stats
  //-----------

  get strength() {
    return this.applyHungerToStat(super.strength)
  }

  get charisma() {
    return this.applyHungerToStat(super.charisma)
  }

  get dexterity() {
    return this.applyHungerToStat(super.dexterity)
  }

  // Derived Stats
  //--------------

  //let weapon modify attack power
  get attackPower() {
    return super.attackPower + this.weapon.attackPower
  }

  //let armor modify deflection
  get deflection() {
    return super.deflection + this.armor.deflection
  }

  //let armor modify arouse power
  get arousePower() {
    return super.arousePower + this.armor.arousePower
  }

  // Hunger
  //-------

  //returns a value by which all offensive base stats will be modified with based on hunger level
  get hungerModifier() {
    if (this.isStarving) {
      return -this.stored.lvl - 5
    }

    if (this.isHungry) {
      return -1
    }

    if (this.isWellFed) {
      return 1
    }

    return 0
  }

  //modifies a stat based on hunger level
  applyHungerToStat(stat) {
    return Math.max(Math.floor(stat + this.hungerModifier), 1)
  }

  //describes how hungry the player is - displayed on main scene
  get hungerDescription() {
    if (this.isStarving) {
      return `You are **starving!** — You will be weakened until you eat something.`
    }

    if (this.isHungry) {
      return `You are **hungry**.`
    }

    return ""
  }

  get woundedDescription() {
    if (this.health <= 1) {
      return `You are **severely wounded** and must rest.`
    }

    return ""
  }

  get arousedDescription() {
    if (this.lust >= this.lustMax - 1) {
      return `You are **too horny** to do anything productive.`
    }

    return ""
  }

  //describes player hunger in a single word
  get hungerStatus() {
    if (this.isStarving) {
      return "starving"
    } else if (this.isHungry) {
      return "hungry"
    } else if (this.isWellFed) {
      return "well fed"
    } else {
      return "normal"
    }
  }

  get isStarving() {
    return this.stored.hunger === 0
  }

  get isHungry() {
    return !this.isStarving && this.stored.hunger < 10
  }

  get isWellFed() {
    return this.stored.hunger > 20
  }

  //allows the player to regain an amount of hunger
  eat(amount) {
    amount = amount || 1
    const previous = this.stored.hunger

    this.stored.hunger += Math.ceil(amount)

    //prevent hunger from going above 24
    this.stored.hunger = Math.min(this.stored.hunger, 24)

    return this.stored.hunger - previous
  }

  //makes the player lose some hunger
  metabolize() {
    this.stored.hunger -= 1

    //prevent from going below 0
    this.stored.hunger = Math.max(this.stored.hunger, 0)
  }

  // LVLing Up
  //----------

  //determines how much exp is required for the next level
  get expRequired() {
    let required = 0
    for (let i = 0; i <= this.stored.lvl; i += 1) {
      required += i * 100
    }

    return required
  }

  //determines if a level up is available
  get canLvlUp() {
    return this.expRequired < this.stored.xp
  }

  //give some exp to the player
  giveXP(amount) {
    this.stored.xp += amount
  }

  // Equipment
  //----------

  get weapon() {
    return this.inventory.equippedWeapon
  }

  get armor() {
    return this.inventory.equippedArmor
  }

  // Parts
  //------
  //
  /**
   * map of things the player has
   * works for: parts, perks
   * ie: `player.has.penis`
   *
   * NOTE: do not use this functionality within parts or perks as it causes circular dependencies
   */
  get has() {
    const out = super.has

    this.perks._PERKS.forEach(
      perk => (out[perk.name] = this.perks.has(perk.name))
    )

    return out
  }

  // shorcut to `player.has` for where it makes more grammatical sense
  get have() {
    return this.has
  }

  // Player description
  //-------------------

  get statsDescription() {
    let statModifier = this.hungerModifier
    if (statModifier > 0) {
      statModifier = `+${statModifier}`
    } else if (statModifier < 0) {
      statModifier = `${statModifier}`
    } else {
      statModifier = ""
    }

    return `
      <p class="block">
        ${statBarTemplate({
          label: "Level",
          current: this.stored.lvl
        })}
        ${statBarTemplate({
          label: "XP",
          current: this.stored.xp,
          max: this.expRequired,
          percentage: this.stored.xp / this.expRequired * 100
        })}
        ${statBarTemplate({
          label: "HP",
          current: this.health,
          max: this.healthMax,
          percentage: this.health / this.healthMax * 100
        })}
        ${statBarTemplate({
          label: "Lust",
          current: this.lust,
          max: this.lustMax,
          percentage: this.lust / this.lustMax * 100
        })}
        ${statBarTemplate({
          label: "Hunger",
          current: this.stored.hunger,
          max: 24,
          percentage: this.stored.hunger / 24 * 100,
          modifier: this.hungerStatus
        })}
      </p>
      <p class="block">
        ${statBarTemplate({
          label: "Strength",
          current: this.strength,
          modifier: statModifier
        })}
        ${statBarTemplate({
          label: "Stamina",
          current: this.stamina
        })}
        ${statBarTemplate({
          label: "Charisma",
          current: this.charisma,
          modifier: statModifier
        })}
        ${statBarTemplate({
          label: "Willpower",
          current: this.willpower
        })}
        ${statBarTemplate({
          label: "Dexterity",
          current: this.dexterity,
          modifier: statModifier
        })}
      </p>`
  }

  get equipmentDescription() {
    return `
        ${this.weapon.equippedDescription}

        ${this.armor.equippedDescription}`
  }

  get bodyDescription() {
    return `
      ${this.body.description}

      ${this.breasts.description}

      ${this.udder.description}

      ${this.genitaliaDescription}

      ${this.buttDescription} `
  }

  get buttDescription() {
    let tailIntro = ""

    if (this.tail.has) {
      if (this.anus.quantity === 1) {
        tailIntro = `It's accompanied by`
      } else {
        tailIntro = `They are accompanied by`
      }
    }

    return `
        Your bottom sports a pair of round butt-cheeks with
        ${this.anus.description}
        ${tailIntro}
        ${this.tail.description}`
  }

  get genitaliaDescription() {
    if (this.penis.has) {
      return `
          ${this.penis.description}
          ${this.balls.description}
          ${this.vagina.description}`
    } else if (this.vagina.has || this.balls.has) {
      return `
          ${this.vagina.description}
          ${this.balls.description}`
    } else {
      return `
          The area between your legs is smooth and featureless as you **lack any form of genitalia**.`
    }
  }
}
