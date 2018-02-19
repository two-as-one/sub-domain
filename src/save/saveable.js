/**
 * Saveable
 * Extend from this class to persists state through page loads
 *
 * 1. extend `saveKey`          - the key against which `savedAttribute` will be stored in localstorage
 * 2. extend `savedAttribute`   - the attribute that will be stored
 * 3. extend `defaults`         - default values if no data is available in localstorage
 */

import save from "save/save"

export default class Saveable {
  constructor() {
    this.restore()
  }

  save() {
    if (this.savedAttribute && this.saveKey) {
      const data = {}
      data[this.saveKey] = JSON.parse(JSON.stringify(this[this.savedAttribute]))
      save.store(data)
    }
  }

  restore() {
    if (this.savedAttribute && this.saveKey && save.fetch()[this.saveKey]) {
      this[this.savedAttribute] = Object.assign(
        this.defaults,
        save.fetch()[this.saveKey]
      )
    } else {
      this[this.savedAttribute] = this.defaults
    }
  }

  //extend this with the key you want to save on
  get saveKey() {
    return ""
  }

  //extend this with the attribute that needs to be saved
  get savedAttribute() {
    return "stored"
  }

  //extend this with any default values you want to be set on this class when it's restored
  get defaults() {
    return {}
  }

  get serialized() {
    if (this.savedAttribute) {
      return JSON.parse(JSON.stringify(this[this.savedAttribute]))
    } else {
      return null
    }
  }
}
