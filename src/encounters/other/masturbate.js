import DefaultEncounter from "./../combat/_super"
import { Position } from "../position"
import { Fuck } from "mechanics/formulas"

class FingerAss extends Position {
  constructor(player) {
    super(player, ["anus"], player, ["hands"])
    this.name = "finger ass"
    this.infects = false
  }

  idle() {
    return `You're fingering [one of:your:adjective:anus].`
  }

  playerStart() {
    return `
      Reaching down between your legs, you let your middle finger trace the
      contour of [one of:your:adjective:anus]. A soft moan escapes your lips as
      you push your finger inside. Pausing for a moment to savour the wonderful
      sensation. Though you can't resist much longer and quickly pick up the
      pace — continually fingering [that:adjective:anus] of yours.`
  }

  playerContinue() {
    return `
      With [your:hands] between your legs, you playfully finger
      [one of:your:adjective:anus]. Your middle finger sliding in and out of
      it, occasionally popping all the way out before eagerly sliding back in.`
  }

  climax() {
    return `
      [your:adjective:anus]~>squirm hungrily as you ceaselessly finger [them].
      Losing yourself to the amazing sensation and crying out with pure ecstasy
      as an earth-shattering anal orgasm overwhelms [you]. Your entire body
      quivering and shaking while [you] slowly regain your senses.

      You smile, licking your fingers with satisfaction while you bask in the
      glory of the aftermath.`
  }

  /* no-ops that must be extended */
  enemyStart() {}
  enemyContinue() {}
}

class JerkOff extends Position {
  constructor(player) {
    super(player, ["penis"], player, ["hands"])
    this.name = "jerk off"
    this.infects = false
  }

  idle() {
    return `You're jerking [two of:your:adjective:penis].`
  }

  playerStart() {
    return `
      Reaching down between your legs, you grab [two of:your:adjective:penis]
      and groan as you start jerking [them] — slowly and steadily. Soon
      [all of:your:hands]~>get sticky as you drool pre all over [them].`
  }

  playerContinue() {
    return `
      [you] keep pumping [two of:your:adjective:penis] as [they]~>throb and
      >drool in [your:hands]. Your fingers getting stickier as more pre
      drips all over them.`
  }

  climax() {
    return `
      Your groans get louder and more erratic as [your:adjective:penis]~>throb
      with anticipation. You find yourself jerking [them] furiously — lost in
      the primal sensation. Then, as a shiver runs down your spine, [you] burst
      out with pure ecstasy — spurting cum all over yourself.

      Moments pass as [you] revel in the fading afterglow.`
  }

  /* no-ops that must be extended */
  enemyStart() {}
  enemyContinue() {}
}

class FingerPussy extends Position {
  constructor(player) {
    super(player, ["vagina"], player, ["hands"])
    this.name = "finger pussy"
    this.infects = false
  }

  idle() {
    return `
      Your fleshy walls squeeze around your fingers as you play with
      [all of:your:adjective:wet:vagina].`
  }

  playerStart() {
    return `
      You reach down between your legs and place a hand against your womanhood —
      Your fingers exploring your slick folds while flicking
      [your:adjective:clit]. It feels good but you need more. Eager and playful,
      you slide a finger into [each of:your:adjective:vagina].

      [you] can't help but moan with delight at the wonderful sensation.`
  }

  playerContinue() {
    return `
      [you] continue playing with your sensitive wet folds. A finger curling
      inside [each of:your:adjective:vagina], sliding in and out rhythmically.
      Your inner walls squeezing tightly at the wonderful sensation.

      Clear and sticky juices drooling out ceaselessly as you make a mess down
      there.`
  }

  climax() {
    return `
      You keep fingering [each of:your:adjective:vagina] — drenching your
      fingers in girl drool. Losing track of time as the euphoric sensation
      washes over you. [you] just need _more_, and without further hesitation
      you shove as many fingers as will fit into
      [each of:your:adjective:vagina].


      The sensation overwhelms [you] as you cry out with joy — waves of pure
      delight coursing through [your:body] as [you] ride that orgasm for as long
      as you can.

      Moments pass and you breathe heavily as [you] recover from your orgasm.
      You've lost track of time and all you know is that
      [all of:your:adjective:vagina]~>feel sore and used — _you_ however, glow
      with satisfaction.`
  }

  /* no-ops that must be extended */
  enemyStart() {}
  enemyContinue() {}
}

class MilkTits extends Position {
  constructor(player) {
    super(player, ["breasts"], player, ["hands"])
    this.name = "milk tits"
    this.infects = false
  }

  idle() {
    return `
      you're holding [two of:your:adjective:breasts], kneading and
      squeezing them playfully.`
  }

  playerStart() {
    return `
      [you] sensually caress the curves of [your:adjective:breasts]. Taking your
      time and easing yourself into the wonderful sensation — occasionally
      flicking [your:adjective:nipples].

      It doesn't take long before you find yourself greedily groping and
      kneading them.`
  }

  playerContinue() {
    return `
      You continue to tug on [your:throbbing:adjective:nipples]
      [your.breasts.milky?leaking milk all over your fingers|]. Your heart
      pounding in your chest as soft moans escape from your lips.

      [your:adjective:breasts]~>feel so sensitive and [your:adjective:nipples]
      all tingly.`
  }

  climax() {
    return `
      You keep rubbing and squeezing [two of:your:adjective:breasts]
      [your.breasts.milky?, squirting milk all over yourself|].
      The sensation is thrilling and wonderful and you just can't stop tugging
      on [your:adjective:nipples]. A warmth emanates from your chest and engulfs
      your entire body as [you] cry out with joy.

      [all of:your:adjective:nipples]~>throb delightfully [your.breasts.milky?
      before you burst out like a fountain and spray your milk everywhere!|.]

      Gradually you regain your senses, still slowly rubbing
      [your:adjective:breasts]. You can't believe [you] just came from playing
      with [your:breasts].`
  }

  /* no-ops that must be extended */
  enemyStart() {}
  enemyContinue() {}
}

/**
 * Masturbate encounter - lets the player blow off some steam
 * @augments DefaultEncounter
 */
export default class MastrubateEncounter extends DefaultEncounter {
  constructor(game) {
    super(game, game.player)

    this.addPosition(FingerAss)
    this.addPosition(JerkOff)
    this.addPosition(FingerPussy)
    this.addPosition(MilkTits)

    // TODO - milk udder
    // TODO - add making out with other head (climax has her jerking your cock or fingering pussy depending on available parts)
  }

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
      text = this.position.get("idle")
    }

    text += `

      ${this.mainMessage(this.player)}`

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
      message = this.position.get("player.start")
    } else {
      message = this.position.get("player.continue")
    }

    message += `

      ${this.seducedResultsMessage()}`

    this.render({
      text: message,
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

  introMessage() {
    return `
      [you] find yourself a nice and comfortable spot to spend some
      well-deserved "alone time".`
  }

  mainMessage() {
    const lust = this.player.lustNormalized

    if (lust < 0.1) {
      return `
        You're not really in the mood but with a little stimulation [you]
        might get there.`
    } else if (lust < 0.3) {
      return `
        You're feeling a little horny and [your:body] lusts for more.`
    } else if (lust < 0.6) {
      return `
        Your body feels warm and tingly and your mind is flooded with dirty
        images.`
    } else if (lust < 0.8) {
      return `
        All you can think of is sex and [you] just want to feel that sweet
        release.`
    } else if (lust < 1) {
      return `
        Oh god — You're so close! You can feel it coming, just a little more…`
    }
  }

  /* no-ops that must be extended */
  describeEnemyMessage() {}
  playerAttackedMessage() {}
  combatLossMessage() {}
  combatVictoryMessage() {}
  climaxLossMessage() {}
  climaxVictoryMessage() {}
  infectionMessage() {}
  pullOutMessage() {}
  struggleSuccessMessage() {}
  struggleFailureMessage() {}
  seducedMessage() {}
  notInterestedMessage() {}
  grappleFailureMessage() {}
  climaxMessage() {}
}
