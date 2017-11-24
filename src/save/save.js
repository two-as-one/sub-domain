class Save {
  constructor(key) {
    this.key = key
  }

  get defaults() {
    return {}
  }

  get isOutOfDate() {
    let saveVersion = this.fetch().VERSION

    //no savegame version - must be out of date
    if (!saveVersion) {
      return true
    }

    const gameVersion = VERSION.split(".").map(str => Number(str))
    saveVersion = saveVersion.split(".").map(str => Number(str))

    //patch version does not matter
    return saveVersion[0] < gameVersion[0] || saveVersion[1] < gameVersion[1]
  }

  get hasData() {
    return Boolean(Object.keys(this.fetch()).length)
  }

  fetch() {
    return Object.assign(
      this.defaults,
      JSON.parse(localStorage.getItem(this.key)) || {}
    )
  }

  store(data) {
    data = Object.assign(this.fetch(), data)
    data.VERSION = VERSION
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}

export default new Save("SUB DOMAIN")
