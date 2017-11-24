import Anus from "parts/anus"
import Balls from "parts/balls"
import Body from "parts/body"
import Breasts from "parts/breasts"
import Entity from "entities/_super"
import Feet from "parts/feet"
import Hands from "parts/hands"
import Inventory from "./inventory"
import Mouth from "parts/mouth"
import Penis from "parts/penis"
import PerkManager from "perks/_manager"
import Tail from "parts/tail"
import TransformationManager from "transformations/_manager"
import Vagina from "parts/vagina"

export default class Player extends Entity {
  constructor() {
    super()

    this.name = "player"

    this.inventory = new Inventory(this)

    this.parts = {
      penis: new Penis(this),
      balls: new Balls(this),
      breasts: new Breasts(this),
      vagina: new Vagina(this),
      anus: new Anus(this),
      hands: new Hands(this),
      feet: new Feet(this),
      mouth: new Mouth(this),
      body: new Body(this),
      tail: new Tail(this)
    }

    this.transform = new TransformationManager(this)
    this.perks = new PerkManager(this)
  }

  // Saving
  //-------

  get defaults() {
    return Object.assign(super.defaults, {
      xp: 0,
      hunger: 11 //starts at 11 so that it takes 2 explorations to become hungry
    })
  }

  get saveKey() {
    return "player-stats"
  }

  save() {
    super.save()

    this.inventory.save()
    this.perks.save()

    Object.keys(this.parts).forEach(key => this.getPart(key).save())
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

  //determines sensitivity based on parts
  sensitivity(name) {
    if (this.has(name)) {
      return this.getPart(name).stats.sensitivity
    } else {
      return 0.25
    }
  }

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
      return -this.stats.lvl - 5
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

  //describes how hungry the player is - displayed on main state
  get hungerDescription() {
    if (this.isStarving) {
      return `<p><b>You are starving!</b> — You should eat something.</p>`
    }

    if (this.isHungry) {
      return `<p><b>You are hungry.</b> — You should eat something.</p>`
    }

    return ""
  }

  get woundedDescription() {
    if (this.currentHP <= 1) {
      return `<p><b>You are severely wounded</b> and must rest.</p>`
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
    return this.stats.hunger === 0
  }

  get isHungry() {
    return !this.isStarving && this.stats.hunger < 10
  }

  get isWellFed() {
    return this.stats.hunger > 20
  }

  //allows the player to regain an amount of hunger
  eat(amount) {
    amount = amount || 1
    this.stats.hunger += amount

    //prevent hunger from going above 24
    this.stats.hunger = Math.min(this.stats.hunger, 24)
  }

  //makes the player lose some hunger
  metabolize() {
    this.stats.hunger -= 1

    //prevent from going below 0
    this.stats.hunger = Math.max(this.stats.hunger, 0)
  }

  // LVLing Up
  //----------

  //determines how much exp is required for the next level
  get expRequired() {
    let required = 0
    for (let i = 0; i <= this.stats.lvl; i += 1) {
      required += i * 100
    }

    return required
  }

  //determines if a level up is available
  get canLvlUp() {
    return this.expRequired < this.stats.xp
  }

  //give some exp to the player
  giveXP(amount) {
    this.stats.xp += amount
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

  getPart(name) {
    return this.parts[name] || {}
  }

  has(name) {
    return Boolean(this.getPart(name).has)
  }

  // Player description
  //-------------------

  get statsDescription() {
    let statModifier = this.hungerModifier
    if (statModifier > 0) {
      statModifier = `[+${statModifier}]`
    } else if (statModifier < 0) {
      statModifier = `[${statModifier}]`
    } else {
      statModifier = ""
    }

    return `
      <p class="block">
        Level: <b>${this.stats.lvl}</b><br>
        XP: <b>${this.stats.xp}/${this.expRequired}</b><br>
        HP: <b>${this.currentHP}/${this.maxHP}</b><br>
        Lust: <b>${this.currentLust}/${this.maxLust}</b><br>
        Hunger: <b>${this.stats.hunger} [${this.hungerStatus}]</b><br>
      </p>
      <p class="block">
        Strength: <b>${this.strength}</b> ${statModifier}<br>
        Stamina: <b>${this.stamina}</b><br>
        Charisma: <b>${this.charisma}</b> ${statModifier}<br>
        Willpower: <b>${this.willpower}</b><br>
        Dexterity: <b>${this.dexterity}</b> ${statModifier}<br>
      </p>`
  }

  get equipmentDescription() {
    return `
      <p>
        ${this.weapon.equippedDescription}
        ${this.armor.equippedDescription}
      </p>`
  }

  get bodyDescription() {
    return `
      ${this.parts.body.description}
      ${this.parts.breasts.description}
      ${this.genitaliaDescription}
      ${this.buttDescription}
    `
  }

  get buttDescription() {
    const buttDescription =
      "Your bottom sports a pair of round butt-cheeks with"
    let tailIntro = ""

    if (this.parts.tail.has) {
      if (this.parts.anus.quantity === 1) {
        tailIntro = `It's accompanied by`
      } else {
        tailIntro = `They are accompanied by`
      }
    }

    return `
      <p>
        ${buttDescription}
        ${this.parts.anus.description}
        ${tailIntro}
        ${this.parts.tail.description}
      </p>`
  }

  get genitaliaDescription() {
    if (this.parts.penis.has) {
      return `
        <p>
          ${this.parts.penis.description}
          ${this.parts.balls.description}
          ${this.parts.vagina.description}
        </p>`
    } else if (this.parts.vagina.has || this.parts.balls.has) {
      return `
        <p>
          ${this.parts.vagina.description}
          ${this.parts.balls.description}
        </p>`
    } else {
      return `
        <p>
          The area between your legs is smooth and featureless as you <b>lack any form of genitalia</b>.
        </p>`
    }
  }

  // Other
  //------

  struggle(target) {
    if (this.perks.has("slippery when wet")) {
      //grant two attempts if the player has this perk
      return super.struggle(target) || super.struggle(target)
    } else {
      return super.struggle(target)
    }
  }
}
