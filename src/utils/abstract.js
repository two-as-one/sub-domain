/**
 * define abstract properties on a class
 * Use this to define properties that MUST be implemented when extending from a
 * base class
 * @param  {instance}    instance - should be `this` in the constructor
 * @param  {...[String]} props    - Any number of properties
 */
export function abstract(instance, ...props) {
  props.forEach(prop => {
    if (!Object.getPrototypeOf(instance).hasOwnProperty(prop)) {
      throw new Error(`Interface property '${prop}' must be implemented.`)
    }
  })
}
