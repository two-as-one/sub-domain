import Entity from "entities/_super"
import Inventory from "./inventory"
import TransformationManager from "transformations/_manager"
import { persist } from "save/saveable"
import statBarTemplate from "templates/stat-bar.hbs"
import { lib } from "library/library"
import { chance } from "utils/chance"

export default class Player extends Entity {
  constructor(game) {
    super(game, {
      name: "",
      title: "hero",
      gender: "neutral",
    })

    this.person = "second"

    this.inventory = new Inventory(this)

    // restore & persist state of player and parts
    persist(this, "player-stats")
    persist(this.perks, "player-perks")
    Object.keys(this.parts).forEach(key =>
      persist(this[key], `player-part-${key}`)
    )

    this.transform = new TransformationManager(this)
  }

  /**
   * hook for the text parser
   * describes `you` or `both of you` in case of conjoinment
   */
  get who() {
    if (this.head.quantity === 2) {
      // multiple "you" intentional to increase its chance of appearing
      const word = chance.pickone([
        "both of you",
        "you both",
        "you",
        "you",
        "you",
      ])

      this.__lastUsedWord = word
      this.__lastUsedName = word

      return word
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
    })
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

  get woundedDescription() {
    return this.health <= 1 ? lib("PLAYER_WOUNDED") : ""
  }

  get arousedDescription() {
    return this.lust >= this.lustMax - 1 ? lib("PLAYER_AROUSED") : ""
  }

  // the player likes everything equally
  likes() {
    return 1
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
    this.xpGained = amount

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
    return `
      <p class="block">
        ${statBarTemplate({
          label: "Level",
          current: this.stored.lvl,
        })}
        ${statBarTemplate({
          label: "XP",
          current: this.stored.xp,
          max: this.expRequired,
          percentage: (this.stored.xp / this.expRequired) * 100,
        })}
        ${statBarTemplate({
          label: "HP",
          current: this.health,
          max: this.healthMax,
          percentage: (this.health / this.healthMax) * 100,
        })}
        ${statBarTemplate({
          label: "Lust",
          current: this.lust,
          max: this.lustMax,
          percentage: (this.lust / this.lustMax) * 100,
        })}
      </p>
      <p class="block">
        ${statBarTemplate({
          label: "Strength",
          current: this.strength,
        })}
        ${statBarTemplate({
          label: "Stamina",
          current: this.stamina,
        })}
        ${statBarTemplate({
          label: "Charisma",
          current: this.charisma,
        })}
        ${statBarTemplate({
          label: "Willpower",
          current: this.willpower,
        })}
        ${statBarTemplate({
          label: "Dexterity",
          current: this.dexterity,
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
