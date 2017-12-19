import DefaultEncounter from "./_super"
import Part from "parts/_super"

/**
 * Masturbate encounter - lets the player blow off some steam
 * @augments DefaultEncounter
 */
export default class MastrubateEncounter extends DefaultEncounter {
  constructor(game) {
    super(game, game.player)
  }

  /** for the purposes of masturbation the `enemy` is also the player */
  get positions() {
    return [
      { name: "finger ass", player: "anus", enemy: "hands" }
      //{ name: "jerk off", player: "penis", enemy: "hands" }
    ]
  }

  main() {
    if (this.player.orgasmed) {
      return this.state.end()
    }

    const actions = []

    this.positions.forEach(position => {
      if (this.player.has(position.player) && this.player.has(position.enemy)) {
        actions.push({
          text: position.name,
          state: "fuck",
          position: position
        })
      }
    })

    actions.push({ text: "stop", state: "flee" })

    this.render({
      text: this.mainMessage,
      responses: actions
    })
  }

  fuck(data) {
    this.fucking = data.position

    const lust = this.player.fuck(
      this.enemy,
      this.fucking.player,
      this.fucking.enemy
    )

    this.render({
      text: this.masturbateMessage + this.seducedResultsMessage(lust),
      responses: [{ state: "main" }]
    })
  }

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

  // Combat messages
  //----------------

  get introMessage() {
    return `<p>You find a nice and comfortable spot to spend some alone-time.</p>`
  }

  get mainMessage() {
    const lust = this.player.normalizedLust
    if (lust < 0.1) {
      return `<p>You're not really in the mood but with a little stimulation you might get there.</p>`
    } else if (lust < 0.3) {
      return `<p>You're feeling a little horny as your body lusts for more.</p>`
    } else if (lust < 0.6) {
      return `<p>Your body feels warm and tingly and your mind is flooded with dirty images.</p>`
    } else if (lust < 0.8) {
      return `<p>All you can think of is sex and you just want to feel that sweet release.</p>`
    } else if (lust < 1) {
      return `<p>Oh god — You're so close! You can feel it coming, just a little more.</p>`
    }
  }

  get masturbateMessage() {
    let text = ""

    switch (this.fucking.name) {
      case "finger ass": {
        const your_ass = this.player.parts.anus.one
        text += `
          <p>
            Reaching down between your legs, you let your middle finger trace the contour of ${your_ass}.
            A soft moan escapes your lips as you push your finger inside.
            You pause for a moment and savour the wonderful sensation, but you can't resist much longer and quickly pick up the pace — continually fingering ${your_ass}.
          </p>`
        break
      }
      case "jerk off":
        break
    }

    return text
  }

  get climaxMessage() {
    let text = ""

    switch (this.fucking.name) {
      case "finger ass": {
        const your_ass = Part.capitalize(this.player.parts.anus.one)
        text += `
          <p>
            ${your_ass} squirms hungrily as you ceaselessly finger it.
            You lose yourself to the overwhelming sensation and cry out with pure ecstasy as an earth-shattering anal orgasm courses through your body.
            Your entire body quivering and shaking while you slowly regain your senses.
          </p>
          <p>
            You smile, licking your fingers with satisfaction as you bask in the glory of the aftermath.
          </p>`
        break
      }
    }

    return text
  }
}
