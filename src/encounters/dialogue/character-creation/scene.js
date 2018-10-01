import DialogueEncounter from "../_super"
import template from "./character-creation.txt"
import titleScreen from "templates/title.hbs"

/**
 * Character Creation
 */
export default class CharacterCreation extends DialogueEncounter {
  constructor(game) {
    super(game)
    this.game.clear()
    this.ingest(template)
  }

  get defaults() {
    return {}
  }

  get FSMStates() {
    return super.FSMStates.concat([
      { name: "outro", from: "*" },
      { name: "end", from: "*" }
    ])
  }

  get functions() {
    return {
      pick_male: () => {
        this.game.player.gender = "male"
        this.game.player.penis.quantity = 1
        this.game.player.balls.quantity = 2
      },
      pick_female: () => {
        this.game.player.gender = "female"
        this.game.player.breasts.size = 5
        this.game.player.nipples.size = 0.4
        this.game.player.vagina.quantity = 1
      },
      pick_blacksmith: () => {
        this.game.player.stored.str += 2
        this.game.player.stored.stam += 2
      },
      pick_thief: () => {
        this.game.player.stored.dex += 2
        this.game.player.stored.prc += 2
      },
      pick_dancer: () => {
        this.game.player.stored.char += 2
        this.game.player.stored.will += 2
      },
      outro: () => {
        this.state.outro()
      }
    }
  }

  outro() {
    this.render({
      classes: "title-screen animated",
      static: titleScreen(),
      responses: [{ state: "end" }]
    })
    this.finishTyping()
    this.locked = true

    setTimeout(() => (this.locked = false), 4500)
  }
}
