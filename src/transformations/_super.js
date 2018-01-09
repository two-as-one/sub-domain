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

  //the chance that this particular transformation will be applied once picked
  get chance() {
    return 0.5
  }

  //must apply the transformation and return a string describing the process
  apply() {
    return ""
  }
}
