import Combat from "./combat/_super"
import Entity from "entities/_super"
import Mastrubate from "./other/masturbate"
import mastrubateConfig from "./other/masturbate.yaml"

import { library } from "library/library"

const store = {}

// create a prefix
function prefix(string = "") {
  return string.toUpperCase().replace(/(\s|-)/g, "_")
}

// add prefixed strings to the library
function addStrings(prefix, data) {
  for (const key in data) {
    library.add(`${prefix}_${key}`, data[key])
  }
}

// preps and stores yaml config
function storeConfig(name, type, data) {
  store[name] = { type, data }

  data.name = name
  data.prefix = prefix(name)

  // add basic strings
  addStrings(data.prefix, data.strings)

  // prefix and add all positions
  data.positions.forEach(position => {
    position.prefix = `${data.prefix}_${prefix(position.name)}`
    addStrings(position.prefix, position.strings)
  })
}

// load all combat encounters
const req = require.context("./combat", false, /^.*\.yaml$/)
req.keys().forEach(key => {
  const name = key.replace(/\.\/(.*)\.yaml/, "$1")
  const data = require(`./combat/${name}.yaml`)
  const type = "combat"

  storeConfig(name, type, data)
})

// add masturbate encounter
storeConfig("masturbate", "masturbate", mastrubateConfig)

export function Factory(game, name) {
  const config = store[name]

  if (!config) {
    return null
  }

  switch (config.type) {
    case "masturbate":
      return new Mastrubate(game, game.player, config.data)
    case "combat":
      return new Combat(game, new Entity(game, config.entity), config.data)
  }
}
