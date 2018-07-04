import SAVE from "save/save"

const ITEMS = {}

/**
 * Allows an object to have data that persists
 * The object will be given a `.stored` property that contains an object with all the stored data
 * The object will be given a `.save()` method that must be triggered to save the state of the `.stored` property
 *
 * @param  {*}        instance - the object to be given a persistent state
 * @param  {String}   key      - the (unique) key that will be used to store the data against
 */
export function persist(instance, key) {
  if (typeof key !== "string") {
    throw new Error("key must be of type String")
  }

  if (ITEMS[key]) {
    throw new Error(`key ${key} already in use`)
  }

  // restore defaults
  instance.stored = Object.assign(
    {},
    instance.defaults,
    instance.stored,
    SAVE.fetch()[key]
  )

  // keep track of key so we can guarantee no duplicates
  ITEMS[key] = instance
}

// saves everything
export function save() {
  for (const key in ITEMS) {
    const item = ITEMS[key]
    const data = JSON.parse(JSON.stringify(item.stored))
    SAVE.store({ [key]: data })
  }
}

// clears all saved data
export function clear() {
  for (const key in ITEMS) {
    delete ITEMS[key]
  }

  SAVE.clear()
}
