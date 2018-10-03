import Part from "./_super"

export default class Hands extends Part {
  get defaults() {
    return Object.assign(super.defaults, {
      quantity: 2,
      size: 1,
    })
  }

  get singular() {
    return ["hand"]
  }

  get plural() {
    return ["hands"]
  }
}
