import DefaultEncounter from "./../combat/_super"
import Grammar from "grammar/grammar"

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
      { name: "finger ass", player: "anus", enemy: "hands" },
      {
        name: "jerk off",
        player: "penis",
        enemy: "hands",
        disabled: this.player.perks.has("impotent")
      },
      { name: "milk tits", player: "breasts", enemy: "hands" },
      { name: "finger pussy", player: "vagina", enemy: "hands" }
    ]
  }

  main() {
    if (this.player.orgasmed) {
      return this.state.end()
    }

    const actions = this.availablePositions.map(position => ({
      text: position.name,
      state: "fuck",
      disabled: Boolean(position.disabled),
      position: position
    }))

    //sort actions by name
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

    this.render({
      text: this.mainMessage,
      responses: actions
    })
  }

  fuck(data) {
    this.fucking = data.position

    const lust = this.player.fuck(
      this.player,
      this.fucking.player,
      this.fucking.enemy
    )

    this.render({
      text: this.masturbateMessage + this.seducedResultsMessage(lust),
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

  get introMessage() {
    const you = this.game.player.who

    return `${you} find yourself a nice and comfortable spot to spend some well-deserved <q>alone time</q>.`
  }

  get mainMessage() {
    const lust = this.player.lustNormalized
    const you = this.game.player.who
    const both = this.game.player.perks.has("conjoined") ? "both" : ""
    const your_body = this.game.player.body.your

    if (lust < 0.1) {
      return `You're not really in the mood but with a little stimulation ${you} might get there.`
    } else if (lust < 0.3) {
      return `You're ${both} feeling a little horny and ${your_body} lusts for more.`
    } else if (lust < 0.6) {
      return `Your body feels warm and tingly and your mind is flooded with dirty images.`
    } else if (lust < 0.8) {
      return `All you can think of is sex and ${you} just want to feel that sweet release.`
    } else if (lust < 1) {
      return `Oh god — You're ${both} so close! You can feel it coming, just a little more…`
    }
  }

  get masturbateMessage() {
    const both = this.game.player.perks.has("conjoined") ? "both" : ""

    switch (this.fucking.name) {
      case "finger ass": {
        const your_ass = this.player.anus.one
        return `
            Reaching down between your legs, you let your middle finger trace the contour of ${your_ass}.
            A soft moan escapes your lips as you push your finger inside.
            You pause for a moment and savour the wonderful sensation, but you can't resist much longer and quickly pick up the pace — continually fingering ${your_ass}.`
      }

      case "jerk off": {
        const your_cock = this.player.penis.all
        const your_hands = this.player.hands.two
        const it = this.player.penis.multiple ? "them" : "it"
        return `
            You reach down with ${your_hands} at ${your_cock}.
            Groaning as you start jerking ${it} — slowly and steadily.
            Soon ${your_hands} get all sticky as you drool pre all over them.`
      }

      case "milk tits": {
        const your_hands = this.player.hands.all
        const your_tits = this.player.breasts.all
        const extra_milky = this.player.breasts.milky
          ? ` as milk drools out of your throbbing nips`
          : ""
        return `
            With ${your_hands} you sensually caress the curves of ${your_tits}.
            Taking your time and easing yourself into the wonderful sensation — occasionally flicking your nipples.
            It doesn't take long before you find yourself greedily groping and kneading them${extra_milky}.`
      }

      case "finger pussy": {
        const your_clit = this.player.vagina.multiple
          ? "your many clits"
          : "your sensitive clitty"
        return `
            You reach down between your legs and place a hand against your womanhood — Your fingers exploring your slick folds while your fingers occasionally flick ${your_clit}.
            You ${both} can't help but moan with delight at the wonderful sensation.`
      }
    }
  }

  get climaxMessage() {
    const you = this.game.player.who
    const both = this.game.player.perks.has("conjoined") ? "both" : ""
    const your_body = this.game.player.body.your

    switch (this.fucking.name) {
      case "finger ass": {
        const your_ass = Grammar.capitalize(this.player.anus.one)
        return `
            ${your_ass} squirms hungrily as you ceaselessly finger it.
            You ${both} lose yourself to the amazing sensation and cry out with pure ecstasy as an earth-shattering anal orgasm overwhelms ${your_body}.
            Your entire body quivering and shaking while ${you} slowly regain your senses.

            You smile, licking your fingers with satisfaction as ${you} bask in the glory of the aftermath.`
      }

      case "jerk off": {
        const your_cock = this.player.penis.all
        const it = this.player.penis.multiple ? "them" : "it"
        const throbs = this.player.penis.multiple ? "throb" : "throbs"
        return `
              Your groans get louder and more erratic as ${your_cock} ${throbs} with anticipation.
              You find yourself jerking ${it} furiously — lost in primal sensation.
              Then, as a shiver runs down your spine, you burst out with pure ecstasy — spurting cum all over yourself.

              Moments pass as ${you} revel in the fading afterglow.`
      }

      case "milk tits": {
        const your_tits = this.player.breasts.all
        const extra_milky1 = this.player.breasts.milky
          ? `, squirting milk all over yourself`
          : ""
        const extra_milky2 = this.player.breasts.milky
          ? `Your nipples bursting out like fountains of milk — spraying it everywhere!`
          : ""
        return `
              You keep rubbing and squeezing ${your_tits}${extra_milky1}.
              The sensation is thrilling and wonderful and you just can't stop tugging on your nipples.
              A warmth emanates from your chest and engulfs your entire body as ${you} cry out with joy.
              ${extra_milky2}

              Slowly you regain your senses, still rubbing ${your_tits}, but more slowly now.
              You can't believe ${you} came just from playing with ${your_tits}.`
      }

      case "finger pussy": {
        const your_pussy = this.player.vagina.all
        const one_of_your_pussies = this.player.vagina.one
        const feels = this.player.vagina.multiple ? "feel" : "feels"
        return `
            You keep rubbing ${your_pussy} — drenching your fingers in girl drool.
            Losing track of time as the euphoric sensation washes over you.
            You just need <i>more</i>, and without any hesitation you shove as many fingers as you can fit into ${one_of_your_pussies}.
            The sensation overwhelms you and you cry out with joy — waves of pure delight coursing through ${your_body} as ${you} ride that orgasm for as long as you can.

            Moments pass and you breathe heavily as ${you} recover from your orgasm.
            You've lost track of time and all you know is that ${your_pussy} ${feels} sore and used - <i>you</i> however, glow with satisfaction.`
      }
    }
  }
}