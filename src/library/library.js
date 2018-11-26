import strings from "./strings.yaml"
import { chance } from "utils/chance"

/**
 * StringBank
 * provides an easy way to define a list of strings and pick one at random
 */
export class StringBank {
  constructor() {
    this.__map = {}
    this.__required = []
  }

  // add a string to a key
  add(key, string) {
    // add key to map
    if (!this.__map[key]) {
      this.__map[key] = []
    }

    // add string to key
    this.__map[key].push(string)
  }

  // adds many strings at once
  addMany(map) {
    for (const key in map) {
      if (Array.isArray(map[key])) {
        map[key].forEach(string => this.add(key, string))
      } else {
        this.add(key, map[key])
      }
    }
  }

  // get a specific key
  get(key) {
    if (!this.has(key)) {
      throw new Error(`Error: no value for ${key}`)
    }

    return chance.pickone(this.__map[key])
  }

  // check that the stringbank has a value for key
  has(key) {
    return this.__map[key] && this.__map[key].length > 0
  }
}

/**
 * The library of strings
 */
class Library {
  constructor() {
    this.strings = new StringBank()
  }

  ingest(config) {
    for (const key in config) {
      try {
        this.add(key, config[key])
      } catch (e) {
        console.warn(e.message, key, config[key])
      }
    }
  }

  add(key, string) {
    if (Array.isArray(string)) {
      string.forEach(s => this.add(key, s))
    } else if (typeof string === "string") {
      this.strings.add(key, string.trim())
    } else {
      throw new Error("Invalid dictionary value")
    }
  }

  get(...args) {
    let key
    let prefix

    // determine prefix and key based on number of args
    if (args.length === 1) {
      key = args[0]
    } else {
      prefix = args[0]
      key = args[1]
    }

    // grab prefix prop if its an object
    if (typeof prefix === "object" && prefix.prefix) {
      prefix = prefix.prefix
    }

    if (prefix) {
      return this.strings.get([prefix, key].join("_"))
    } else {
      return this.strings.get(key)
    }
  }

  combine(...args) {
    return [...args].join(`\n\n`)
  }

  // return a list of all strings matching a prefix
  // for debugging purposes
  debug(prefix) {
    const regex = new RegExp(`^${prefix}`)
    const list = []
    Object.entries(this.strings.__map).forEach(pair => {
      const key = pair[0]
      const val = pair[1]

      if (regex.test(key)) {
        list.push(`#### ${key.replace(/_/g, "\\_")}`, ...val)
      }
    })

    return list
  }
}

export const library = new Library()
library.ingest(strings)

// shorthands common to library functions
export const lib = (...args) => library.get(...args)
export const combine = (...args) => library.combine(...args)

window.library = library
