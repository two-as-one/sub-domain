import "styles/combat.less"
import State from "./_super"
import template from "templates/combat.hbs"

export default class Combat extends State {
  get template() {
    return template
  }

  //render combat
  render(data) {
    data.player = this.player
    data.enemy = this.enemy

    super.render(data)
  }
}
