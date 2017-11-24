import Chance from "chance"
import Part from "./_super"
const chance = new Chance()

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
  get saveKey() {
    return "player-part-breasts"
  }

  get defaults() {
    return Object.assign(super.defaults, {
      size: 2, //in bust inches
      sensitivity: 0.5,
      quantity: 2,
      config: [2] //defines how many breasts there are per row
    })
  }

  add(number) {
    number = number || 1
    this.quantity += number
  }

  get quantity() {
    return this.stats.config.reduce((a, b) => a + b, 0)
  }

  set quantity(val) {
    const options = BREAST_CONFIGS.filter(
      list => list.reduce((a, b) => a + b) === val
    )
    this.stats.config = chance.pickone(options).filter(row => row)
  }

  get description() {
    let text = ""

    if (this.has) {
      if (this.size < 4 && this.quantity < 5) {
        text += `Your chest is graced by `
      } else {
        text += `You have `
      }

      text += `<b>${this.number} ${this.adjective} ${this.cupSize} ${
        this.pluralized
      }</b>`

      //false if rows are uneven, otherwise returns the amount of breasts per row
      const evenRows = this.stats.config.reduce((a, b) => a === b && b)

      if (this.quantity > 3) {
        if (this.stats.config.length === 1) {
          text += ` — all in a single row`
        } else if (evenRows) {
          text += ` — ${Part.number(
            this.stats.config.length
          )} rows of ${Part.number(evenRows)}`
        } else {
          text += `. Spread over ${Part.number(
            this.stats.config.length
          )} rows —`

          this.stats.config.forEach((row, i, list) => {
            text += ` ${Part.number(row)} on the ${Part.ordinal(i + 1)}`

            if (list[i + 2]) {
              text += ","
            } else if (list[i + 1]) {
              text += ` and`
            }
          })
        }
      }

      text += `.`
    } else {
      text = `Your chest is flat and unnoteworthy.`
    }

    return Part.trim(`<p>${text}</p>`)
  }

  get seductionMessage() {
    return Part.random([
      `<p>
        You cup ${
          this.all
        } and make them jiggle. You then squeeze them individually before squishing them together.
      </p>`,
      `<p>
        With your hands behind your head, your shake your bosom. Making ${
          this.all
        } bounce against one another in a delightful display.
      </p>`
    ])
  }

  get canSeduce() {
    return true
  }

  get singular() {
    let choices = ["breast", "boob", "tit", "mammary"]

    if (this.size > 8) {
      choices = choices.concat(["knocker", "jug", "melon"])
    }

    return Part.random(choices)
  }

  get plural() {
    let choices = ["breasts", "boobs", "boobies", "tits", "mammaries"]

    if (this.size > 8) {
      choices = choices.concat(["knockers", "jugs", "melons"])
    }

    return Part.random(choices)
  }

  get adjective() {
    if (this.size < 4) {
      return "perky"
    } else if (this.size < 8) {
      return "respectable"
    } else if (this.size < 12) {
      return "massive"
    } else {
      return "humongous"
    }
  }

  get cupSize() {
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
