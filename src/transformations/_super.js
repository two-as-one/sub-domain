export default class Transformation {
  constructor(owner) {
    this.owner = owner
  }

  //this must return a unique transformation name
  get name() {
    return "null"
  }

  //must return true if this transformation can be applied
  get available() {
    return false
  }

  //must apply the transformation and return a string describing the process
  apply() {
    return ""
  }
}
