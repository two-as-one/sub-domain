import DialogueEncounter from "./_super"
import { persist } from "save/saveable"
import template from "./phallic-shrine.pug"

/**
 * DialogueEncounter
 */
export default class PhallicShrine extends DialogueEncounter {
  constructor(game) {
    super(game)

    persist(this, "shrine-phallus")

    this.ingest(template())
  }

  get defaults() {
    return {
      cleared: false,
      desecrated: false,
    }
  }

  get FSMStates() {
    return super.FSMStates.concat([
      { name: "bless", from: "*" },
      { name: "anger", from: "*" },
      { name: "end", from: "*" },
    ])
  }

  bless() {
    this.game.player.perks.grant("blessing of phallus")
    this.game.player.perks.revoke("anger of phallus")

    this.render({
      text: `blessed`,
      responses: [{ state: "end" }],
    })
  }

  anger() {
    this.game.player.perks.grant("anger of phallus")
    this.game.player.perks.revoke("blessing of phallus")
    this.stored.desecrated = true

    this.render({
      text: `angered`,
      responses: [{ state: "end" }],
    })
  }

  get conditions() {
    return {
      untarnished: !this.stored.cleared,
      desecrated: this.stored.cleared && this.stored.desecrated,
      cleared: this.stored.cleared && !this.stored.desecrated,
    }
  }

  get actions() {
    return {
      clear: () => (this.stored.cleared = true),
      exit: () => this.state.end(),
      anger: () => this.state.anger(),
      bless: () => this.state.bless(),
    }
  }
}
