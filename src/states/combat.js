import "styles/combat.less"
import State from "./_super"
import template from "templates/combat.hbs"

export default class Combat extends State {
  //render combat
  render(data) {
    data.static = template({
      player: this.player,
      enemy: this.enemy,
      hideStats: data.hideStats
    })

    data.classes = "combat"

    super.render(data)
  }
}
