// grab the ID at the start of a line
const REGEX_ID = /^(\d+)\.\s/
// grab a pointer
const REGEX_POINTER = /->\s(\d+)/
// grab the indentation at the start of a line
const REGEX_INDENTATION = /^\s*/
// test for linear text
const REGEX_LINEAR = /^(\.\.\.)/
// grabs the action
const REGEX_ACTION = /\[ACTION=([a-zA-Z_]+)\]/
// grabs the requirement
const REGEX_REQUIRED = /\[REQUIRED=([a-zA-Z_]+)\]/
// grabs the disabled
const REGEX_DISABLED = /\[DISABLED=([a-zA-Z_]+)\]/
// grab a multi-line indicator
const REGEX_MULTILINE = /^(\|\s)/

function hasIdenticalIndentation(a, b) {
  return a.match(REGEX_INDENTATION)[0] === b.match(REGEX_INDENTATION)[0]
}

function hasID(a) {
  return Boolean(a.match(REGEX_ID))
}

function isPointer(a) {
  return Boolean(a.match(REGEX_POINTER))
}

export class Dialogue {
  constructor(raw = "", map = {}) {
    this.raw = raw
    this.map = map
    this.tree = Dialogue.parse(raw)
    this.current = null

    // validate that all required functions are in the map
    this.tree.forEach(branch => {
      if (branch.disabled && !(branch.disabled in map)) {
        throw new Error(`Missing map function: ${branch.disabled}`)
      }

      if (branch.required && !(branch.required in map)) {
        throw new Error(`Missing map function: ${branch.required}`)
      }

      if (branch.action && !(branch.action in map)) {
        throw new Error(`Missing map function: ${branch.action}`)
      }

      if (branch.next.length > 1) {
        branch.prev.forEach(prev => {
          prev = this.getBranch(prev)
          if (prev.next.length > 1) {
            throw new Error(
              `Branching path cannot itself have multiple branches: ${
                branch.text
              }`
            )
          }
        })
      }
    })
  }

  interact(id) {
    const branch = this.getBranch(id)
    const next = branch.next.map(id => this.getBranch(id))
    const prev = this.getBranch(this.current)

    // validate interaction
    if (this.current && !branch.prev.includes(this.current)) {
      throw new Error("Invalid dialogue interaction")
    }

    // trigger action
    this.trigger(branch.action)

    // keep track of current position in dialogue
    this.current = branch.id

    // if we're currently on a branching path, move straight to the next option
    // this prevents player choices from becoming their own entries
    if (prev && prev.next.length > 1) {
      return this.interact(branch.next[0])
    }

    // calculate player responses
    let responses
    if (branch.next.length === 1 && next[0].linear) {
      // linear dialogue
      // create a '…' option for the player to move to the next dialogue entry
      responses = [
        {
          id: next[0].id,
          text: "…"
        }
      ]
    } else {
      // branching dialogue
      // create an option for each branch
      responses = next
        .map(item => ({
          id: item.id,
          disabled: item.disabled ? this.map[item.disabled]() : false,
          text: item.text
        }))
        .filter(this.requiredFilter)
    }

    return {
      text: branch.text,
      responses
    }
  }

  trigger(action) {
    if (action in this.map) {
      return this.map[action]()
    }
  }

  requiredFilter(item) {
    if (item.required) {
      return this.map[item.required]()
    } else {
      return true
    }
  }

  start() {
    return this.interact(this.getStart().id)
  }

  getStart() {
    return this.tree.find(branch => branch.prev.length === 0)
  }

  getBranch(id) {
    return this.tree.find(branch => branch.id === id)
  }

  /**
   * Parse raw dialogue text and returns an array of branches
   * Each item in the array will have:
   *   - {String} id                  - the ID of the branch
   *   - {String} text                - The text of the branch
   *   - {Array[id]} next             - An array containing next branches
   *   - {Array[id]} prev             - An array containing previous branches
   *   - {Boolean|String} required    - false or a string mapping to a function
   *   - {Boolean|String} disabled    - false or a string mapping to a function
   *   - {Boolean|String} action      - false or a string mapping to a function
   */
  static parse(input) {
    let dialogue = []
    const lines = input.split("\n")

    function makeDialogueEntry(line) {
      const id = hasID(line) ? String(line.match(REGEX_ID)[1]) : null

      dialogue.push({
        id,
        raw: [line]
      })
    }

    function getLastDialogueEntry() {
      return dialogue[dialogue.length - 1] || { raw: [] }
    }

    function getItem(id) {
      return dialogue.find(item => item.id === id)
    }

    // loop over all lines and decide whether to make a new entry or add it to a multi-line entry
    let prev
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // empty lines get appended to the last entry
      if (!line.trim()) {
        getLastDialogueEntry().raw.push(line)
        continue
      }

      if (
        !prev ||
        hasID(line) ||
        !hasIdenticalIndentation(line, prev) ||
        isPointer(line)
      ) {
        makeDialogueEntry(line)
      } else {
        getLastDialogueEntry().raw.push(line)
      }

      prev = line
    }

    dialogue.forEach((item, i) => {
      // add ID if none exists
      if (item.id === null) {
        item.id = `_${i}`
      }

      // combine lines and remove ID
      item.text = item.raw
        .map(text => text.replace(REGEX_MULTILINE, ""))
        .join("\n\n")
        .trim()
        .replace(REGEX_ID, "")

      // calculate indentation
      item.indent = item.raw[0].match(REGEX_INDENTATION)[0].length

      // identify pointers
      item.pointer = isPointer(item.text)
        ? item.text.match(REGEX_POINTER)[1]
        : null

      // identify linear dialogue
      item.text = item.text
        .replace(REGEX_LINEAR, str => {
          item.linear = true
          return ""
        })
        .trim()

      // identify actions
      item.text = item.text
        .replace(REGEX_ACTION, (str, fn) => {
          item.action = fn
          return ""
        })
        .trim()

      // identify requirements
      item.text = item.text
        .replace(REGEX_REQUIRED, (str, fn) => {
          item.required = fn
          return ""
        })
        .trim()

      // identify disabled
      item.text = item.text
        .replace(REGEX_DISABLED, (str, fn) => {
          item.disabled = fn
          return ""
        })
        .trim()
    })

    // add NEXT options to each entry
    for (let i = 0; i < dialogue.length; i++) {
      const item = dialogue[i]
      const itemDepth = item.indent
      item.next = []
      item.prev = []

      for (let ii = i - 1; ii >= 0; ii--) {
        const prev = dialogue[ii]
        const prevDepth = prev.indent

        if (prevDepth < itemDepth) {
          prev.next.push(item.id)
          break
        }
      }
    }

    // replace pointers with actual ID's
    dialogue.forEach(item => {
      item.next = item.next.map(next => {
        let item = getItem(next)
        while (item.pointer) {
          item = getItem(item.pointer)
        }

        return item.id
      })
    })

    // add previous pointers
    dialogue.forEach(item => {
      item.next.forEach(next => {
        getItem(next).prev.push(item.id)
      })
    })

    // remove pointers
    dialogue = dialogue.filter(item => !item.pointer)

    // remove items with no prev or next (essentially dead branches)
    dialogue = dialogue.filter(item => item.next.length || item.prev.length)

    // clean up items, delete unnecessary props and add defaults where needed
    dialogue.forEach(item => {
      delete item.indent
      delete item.pointer
      delete item.raw

      item.action = item.action || false
      item.disabled = item.disabled || false
      item.required = item.required || false
    })

    return dialogue
  }
}
