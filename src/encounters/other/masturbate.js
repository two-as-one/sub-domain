import DefaultEncounter from "./../combat/_super"
import { Position } from "../position"

class FingerAss extends Position {
  constructor(player) {
    super(player, ["anus"], player, ["hands"])
    this.name = "finger ass"
    this.infects = false
  }

  idle(p) {
    return `You're fingering [one of:your:adjective:anus].`
  }

  playerStart(p) {
    return `
      Reaching down between your legs, you let your middle finger trace the
      contour of [one of:your:adjective:anus]. A soft moan escapes your lips as
      you push your finger inside. Pausing for a moment to savour the wonderful
      sensation. Though you can't resist much longer and quickly pick up the
      pace — continually fingering [that:adjective:anus] of yours.`
  }

  playerContinue(p) {
    return `
      With [your:hands] between your legs, you playfully finger
      [one of:your:adjective:anus]. Your middle finger sliding in and out of
      it, occasionally popping all the way out before eagerly sliding back in.`
  }

  climax(p) {
    return `
      [your:adjective:anus]~>squirm hungrily as you ceaselessly finger [them].
      Losing yourself to the amazing sensation and crying out with pure ecstasy
      as an earth-shattering anal orgasm overwhelms [you]. Your entire body
      quivering and shaking while [you] slowly regain your senses.

      You smile, licking your fingers with satisfaction while you bask in the
      glory of the aftermath.`
  }

  /* no-ops that must be extended */
  enemyStart(p) {}
  enemyContinue(p) {}
}

class JerkOff extends Position {
  constructor(player) {
    super(player, ["penis"], player, ["hands"])
    this.name = "jerk off"
    this.infects = false
  }

  idle(p) {
    return `You're jerking [two of:your:adjective:penis].`
  }

  playerStart(p) {
    return `
      Reaching down between your legs, you grab [two of:your:adjective:penis]
      and groan as you start jerking [them] — slowly and steadily. Soon
      [all of:your:hands]~>get sticky as you drool pre all over [them].`
  }

  // TODO - text missing
  playerContinue(p) {
    return ``
  }

  climax(p) {
    return `
      Your groans get louder and more erratic as [your:adjective:penis]~>throb
      with anticipation. You find yourself jerking [them] furiously — lost in
      the primal sensation. Then, as a shiver runs down your spine, [you] burst
      out with pure ecstasy — spurting cum all over yourself.

      Moments pass as [you] revel in the fading afterglow.`
  }

  /* no-ops that must be extended */
  enemyStart(p) {}
  enemyContinue(p) {}
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
  }

  // /** for the purposes of masturbation the `enemy` is also the player */
  // get positions() {
  //   return [
  //     { name: "milk tits", player: "breasts", enemy: "hands" },
  //     { name: "finger pussy", player: "vagina", enemy: "hands" }
  //   ]
  // }

  main() {
    if (this.player.orgasmed) {
      return this.state.end()
    }

    const actions = this.availablePositions.map(position => ({
      text: position.name,
      state: "fuck",
      disabled: position.disabled,
      position: position
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
      responses: actions
    })
  }

  fuck(data) {
    const start = this.position !== data.position
    this.fucking = true
    this.position = data.position

    // TODO - USE FORMULA
    const lust = this.player.fuck(
      this.player,
      this.position.focus.player,
      this.position.focus.enemy
    )

    let message
    if (start) {
      message = this.position.get("player.start")
    } else {
      message = this.position.get("player.continue")
    }

    message += `

      ${this.seducedResultsMessage(lust)}`

    this.render({
      text: message,
      responses: [{ state: "main" }]
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

  introMessage(p) {
    return `
      [you] find yourself a nice and comfortable spot to spend some
      well-deserved "alone time".`
  }

  mainMessage(p) {
    const lust = p.lustNormalized

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
  // get masturbateMessage() {
  //   const both = this.game.player.perks.has("conjoined") ? "both" : ""

  //   switch (this.fucking.name) {

  //     case "milk tits": {
  //       const your_hands = this.player.hands.all
  //       const your_tits = this.player.breasts.all
  //       const extra_milky = this.player.breasts.milky
  //         ? ` as milk drools out of your throbbing nips`
  //         : ""
  //       return `
  //           With ${your_hands} you sensually caress the curves of ${your_tits}.
  //           Taking your time and easing yourself into the wonderful sensation — occasionally flicking your nipples.
  //           It doesn't take long before you find yourself greedily groping and kneading them${extra_milky}.`
  //     }

  //     case "finger pussy": {
  //       const your_clit = this.player.vagina.multiple
  //         ? "your many clits"
  //         : "your sensitive clitty"
  //       return `
  //           You reach down between your legs and place a hand against your womanhood — Your fingers exploring your slick folds while your fingers occasionally flick ${your_clit}.
  //           You ${both} can't help but moan with delight at the wonderful sensation.`
  //     }
  //   }
  // }

  // get climaxMessage() {
  //   const you = this.game.player.who
  //   const both = this.game.player.perks.has("conjoined") ? "both" : ""
  //   const your_body = this.game.player.body.your

  //   switch (this.fucking.name) {

  //     case "milk tits": {
  //       const your_tits = this.player.breasts.all
  //       const extra_milky1 = this.player.breasts.milky
  //         ? `, squirting milk all over yourself`
  //         : ""
  //       const extra_milky2 = this.player.breasts.milky
  //         ? `Your nipples bursting out like fountains of milk — spraying it everywhere!`
  //         : ""
  //       return `
  //             You keep rubbing and squeezing ${your_tits}${extra_milky1}.
  //             The sensation is thrilling and wonderful and you just can't stop tugging on your nipples.
  //             A warmth emanates from your chest and engulfs your entire body as ${you} cry out with joy.
  //             ${extra_milky2}

  //             Slowly you regain your senses, still rubbing ${your_tits}, but more slowly now.
  //             You can't believe ${you} came just from playing with ${your_tits}.`
  //     }

  //     case "finger pussy": {
  //       const your_pussy = this.player.vagina.all
  //       const one_of_your_pussies = this.player.vagina.one
  //       const feels = this.player.vagina.multiple ? "feel" : "feels"
  //       return `
  //           You keep rubbing ${your_pussy} — drenching your fingers in girl drool.
  //           Losing track of time as the euphoric sensation washes over you.
  //           You just need <i>more</i>, and without any hesitation you shove as many fingers as you can fit into ${one_of_your_pussies}.
  //           The sensation overwhelms you and you cry out with joy — waves of pure delight coursing through ${your_body} as ${you} ride that orgasm for as long as you can.

  //           Moments pass and you breathe heavily as ${you} recover from your orgasm.
  //           You've lost track of time and all you know is that ${your_pussy} ${feels} sore and used - <i>you</i> however, glow with satisfaction.`
  //     }
  //   }
  // }
}
