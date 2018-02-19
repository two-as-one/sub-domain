export default class Perk {
  constructor(player) {
    this.player = player
  }

  /**
   * perk name
   * This must be unique among perks as it's used as an identifier
   * @return {String} The name of this perk
   */
  get name() {
    return ""
  }

  /**
   * Determines whether this perk is available for the player to pick
   * @return {Boolean} true if available
   */
  get available() {
    return true
  }

  /**
   * The description of this perk
   * @return {String}
   */
  get description() {
    return ""
  }

  /**
   * A description of the effect of this perk
   * @return {String}
   */
  get effect() {
    return ""
  }

  /**
   * Defines whether this perk is a gift
   * Gifts cannot be acquired through normal means
   * @return {Boolean}
   */
  get gift() {
    return false
  }
}
