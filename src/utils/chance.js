import Chance from "chance"

export let chance

export function seed(value = null) {
  chance = new Chance(value)
}

// seed with random name
seed(new Chance().name())

window.seed = seed
