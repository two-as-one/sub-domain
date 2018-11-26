import DefaultEncounter from "./../combat/_super"
import { Fuck } from "mechanics/formulas"
import { lib, combine } from "library/library"

/**
 * Masturbate encounter - lets the player blow off some steam
 * @augments DefaultEncounter
 */
export default class MastrubateEncounter extends DefaultEncounter {
  main() {
    if (this.player.orgasmed) {
      return this.state.end()
    }

    const actions = this.availablePositions.map(position => ({
      text: position.name,
      state: "fuck",
      disabled: position.disabled,
      position: position,
    }))

    // sort actions by name
    actions.sort((a, b) => {
      if (a.text < b.text) {
        return -1
      } else if (a.text > b.text) {
        return 1
      } else {
        return 0
      }
    })

    actions.push({ text: "cancel", state: "flee" })

    let text = ""
    if (this.position) {
      text = lib(this.position, "IDLE")
    }

    const lust = this.player.lustNormalized

    if (lust < 0.1) {
      text = combine(text, lib(this, "MAIN_LUST_0"))
    } else if (lust < 0.3) {
      text = combine(text, lib(this, "MAIN_LUST_1"))
    } else if (lust < 0.6) {
      text = combine(text, lib(this, "MAIN_LUST_2"))
    } else if (lust < 0.8) {
      text = combine(text, lib(this, "MAIN_LUST_3"))
    } else if (lust < 1) {
      text = combine(text, lib(this, "MAIN_LUST_4"))
    }

    this.render({
      text: text,
      responses: actions,
    })
  }

  fuck(data) {
    const start = this.position !== data.position
    this.fucking = true
    this.position = data.position

    const focus = this.position.focus
    const formula = new Fuck(focus.player, focus.enemy)
    const amount = formula.roll()

    this.player.arouse(amount)

    let message
    if (start) {
      message = lib(this.position, "PLAYER_START")
    } else {
      message = lib(this.position, "PLAYER_CONTINUE")
    }

    this.render({
      text: combine(message, lib("LUST_GAIN")),
      responses: [{ state: "main" }],
    })
  }

  /** fleeing is immediate since there's nothing to flee from */
  flee() {
    this.state.exit()
  }

  /** there is no enemy in this encounter so their actions are skipped */
  enemyAction() {
    this.state.main()
  }

  render(data) {
    data.hideStats = true
    super.render(data)
  }
}
