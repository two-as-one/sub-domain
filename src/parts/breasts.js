import { chance } from "utils/chance"
import Grammar from "grammar/grammar"
import Part from "./_super"

const BREAST_CONFIGS = []

//determines whether a breast configuration is valid
function validBreastConfig(a, b, c, d) {
  if (a === 1 || b === 1 || c === 1 || d === 1) {
    return false //can't have rows with 1 breast
  }

  if (b > a || c > b || d > c) {
    return false //can't have lower rows with more breasts than upper rows
  }

  return true
}

//calculate viable breast configurations
for (let a = 0; a <= 4; a += 1) {
  for (let b = 0; b <= 4; b += 1) {
    for (let c = 0; c <= 4; c += 1) {
      for (let d = 0; d <= 4; d += 1) {
        if (validBreastConfig(a, b, c, d)) {
          BREAST_CONFIGS.push([a, b, c, d])
        }
      }
    }
  }
}
BREAST_CONFIGS.push([1, 0, 0, 0]) //make an exception for a single breast

export default class Breasts extends Part {
  constructor(...args) {
    super(...args)

    this.addSynonym("pec", null, () => this.size === 0)
    this.addSynonym("tit", null, () => this.size > 0)
    this.addSynonym("boob", null, () => this.size > 0)
    this.addSynonym("breast", null, () => this.size > 0)
    this.addSynonym("mammary", null, () => this.size > 0)
    this.addSynonym("tit", "titties", () => this.size > 0)
    this.addSynonym("boob", "boobies", () => this.size > 0)
    this.addSynonym("jug", null, () => this.size > 8)
    this.addSynonym("melon", null, () => this.size > 8)
    this.addSynonym("knocker", null, () => this.size > 8)

    this.addAdjective("flat", () => this.size === 0)
    this.addAdjective("soft", () => this.size > 0)
    this.addAdjective("sensitive", () => this.size > 0)
    this.addAdjective("small", () => this.between(0, 4))
    this.addAdjective("perky", () => this.between(0, 4))
    this.addAdjective("little", () => this.between(0, 4))
    this.addAdjective("modest", () => this.between(4, 8))
    this.addAdjective("sizeable", () => this.between(4, 8))
    this.addAdjective("big", () => this.between(8, 12))
    this.addAdjective("ample", () => this.between(8, 12))
    this.addAdjective("hefty", () => this.between(8, 12))
    this.addAdjective("heavy", () => this.between(8, 12))
    this.addAdjective("large", () => this.between(8, 12))
    this.addAdjective("massive", () => this.size > 12)
    this.addAdjective("enormous", () => this.size > 12)
    this.addAdjective("imposing", () => this.size > 12)
    this.addAdjective("humongous", () => this.size > 12)
    this.addAdjective("milky", () => this.milky)
    this.addAdjective("creamy", () => this.milky)
    this.addAdjective("bountiful", () => this.milky)
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 0, //in bust inches
      sensitivity: 0.5,
      quantity: 2,
      milk: 0, //milk production
      config: [2], //defines how many breasts there are per row
    })
  }

  add(number) {
    number = number || 1
    this.quantity += number
  }

  get quantity() {
    return this.stored.config.reduce((a, b) => a + b, 0)
  }

  set quantity(val) {
    const options = BREAST_CONFIGS.filter(
      list => list.reduce((a, b) => a + b) === val
    )
    this.stored.config = chance.pickone(options).filter(row => row)
  }

  get sensitivity() {
    if (this.size === 0) {
      return super.sensitivity / 2
    } else {
      return super.sensitivity
    }
  }

  /**
   * check whether these breasts produce any milk
   * @type {Boolean}
   */
  get milky() {
    return this.stored.milk > 0
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.size < 4 && this.quantity < 5) {
        text += `Your chest is graced by `
      } else {
        text += `You/have `
      }

      const number = this.number
      const adjective = this.adjective
      const humanReadableSize = this.humanReadableSize
      const tits = this.name

      text += `**${number} ${adjective} ${humanReadableSize} ${tits}**`

      //false if rows are uneven, otherwise returns the amount of breasts per row
      const evenRows = this.stored.config.reduce((a, b) => a === b && b)

      if (this.quantity > 3) {
        if (this.stored.config.length === 1) {
          text += ` — all in a single row and each `
        } else if (evenRows) {
          const row_number = Grammar.number(this.stored.config.length)
          const number = Grammar.number(evenRows)
          text += ` — ${row_number} rows of ${number}. Each `
        } else {
          const row_number = Grammar.number(this.stored.config.length)
          text += `. Spread over ${row_number} rows —`

          this.stored.config.forEach((row, i, list) => {
            text += ` ${Grammar.number(row)} on the ${Grammar.ordinal(i + 1)}`

            if (list[i + 2]) {
              text += ","
            } else if (list[i + 1]) {
              text += ` and`
            }
          })

          text += `. Each `
        }
      } else {
        text += ` — each `
      }

      text += this.owner.nipples.description

      if (this.milky) {
        text += ` [all of:them:(your):(breasts)]~>ache, **brimming with milk**.`
      }
    } else {
      text = `Your chest is flat and unnoteworthy. Your pecs each ${
        this.owner.nipples.description
      }`
    }

    return text
  }

  get seductionMessage() {
    return chance.pickone([
      `you cup [two of:your:adjective:breasts] and make [them] jiggle — squeezing
      [them] playfully.`,
      `With [your:hands] behind [your:head], you shake your bosom. Making
       [all of:your:adjective:breasts] jiggle in a delightfully delicious
       display.`,
    ])
  }

  get canSeduce() {
    return true
  }

  get humanReadableSize() {
    if (this.size <= 1) {
      return "AA-cup"
    } else if (this.size <= 2) {
      return "A-cup"
    } else if (this.size <= 3) {
      return "B-cup"
    } else if (this.size <= 4) {
      return "C-cup"
    } else if (this.size <= 5) {
      return "D-cup"
    } else if (this.size <= 6) {
      return "DD-cup"
    } else if (this.size <= 7) {
      return "E-cup"
    } else if (this.size <= 8) {
      return "F-cup"
    } else if (this.size <= 9) {
      return "G-cup"
    } else if (this.size <= 10) {
      return "H-cup"
    } else if (this.size <= 11) {
      return "I-cup"
    } else if (this.size <= 12) {
      return "J-cup"
    } else if (this.size <= 13) {
      return "K-cup"
    } else if (this.size <= 14) {
      return "L-cup"
    } else if (this.size <= 15) {
      return "M-cup"
    } else if (this.size <= 16) {
      return "N-cup"
    } else if (this.size <= 17) {
      return "O-cup"
    } else {
      return ""
    }
  }
}
