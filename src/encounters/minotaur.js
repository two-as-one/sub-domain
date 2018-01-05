import DefaultEncounter from "./_super"
import Grammar from "utils/grammar"
import Minotaur from "entities/minotaur"

export default class MinotaurEncounter extends DefaultEncounter {
  constructor(game) {
    super(game, new Minotaur())
  }

  get positions() {
    return [
      { name: "anal", player: "anus", enemy: "penis", infects: true },
      { name: "vaginal", player: "vagina", enemy: "penis", infects: true },
      { name: "blowjob", player: "mouth", enemy: "penis", infects: true },
      { name: "boobjob", player: "breasts", enemy: "penis" },
      { name: "frotting", player: "penis", enemy: "penis" }
      // 'hands':    'handjob',
      // 'feet':     'footjob',
    ]
  }

  // Combat messages
  //----------------

  get introMessage() {
    const your_head = this.game.player.parts.head.all

    return `
      <p>
        Suddenly a massive axe swings right above ${your_head} and cuts through the flora. You are ambushed by a <b>minotaur</b>!
      </p>`
  }

  get describeEnemyMessage() {
    let text = `You've read about these in books. A creature with the head of a bull and the body of a man.`

    if (this.player.parts.body.size < 190) {
      text += ` Towering over you, it must be at least 7 feet tall.`
    } else {
      text += ` You estimate it to be at least 7 feet tall.`
    }

    text += ` Brandishing an oversized axe and wearing no clothing or jewellery.
              The tales failed to mention a considerable detail — Its monstrous bovine cock, throbbing and filling the air with potent musk!`

    return `<p>${text}</p>`
  }

  get mainMessage() {
    if (!this.fucking) {
      return `<p>You are facing a <b>minotaur</b>.</p>`
    } else {
      switch (this.fucking.name) {
        case "anal": {
          const your_ass = this.player.parts.anus.one
          return `<p>The <b>minotaur</b> has its cock lodged deep inside ${your_ass}.</p>`
        }
        case "vaginal": {
          const your_pussy = this.player.parts.vagina.one
          return `<p>The <b>minotaur</b>'s cock is throbbing deep inside ${your_pussy}.</p>`
        }
        case "blowjob":
          return `<p>The <b>minotaur</b>'s cock is throbbing deep down your throat.</p>`
        case "boobjob": {
          const your_tits = this.player.parts.breasts.all
          return `<p>You have ${your_tits} squeezed tightly around the <b>minotaur</b>'s cock.</p>`
        }
        case "frotting": {
          const your_hands = this.player.parts.hands.all
          const your_cock = this.player.parts.penis.all
          return `<p>You have ${your_hands} wrapped around the <b>minotaur</b>'s and ${your_cock}.</p>`
        }
      }
    }
  }

  get playerAttackdeMessage() {
    return `<p>The minotaur swings its massive axe at you.</p>`
  }

  get combatLossMessage() {
    return `<p>The minotaur roars victoriously, swinging its axe in the air a few times before walking away. Leaving your —almost lifeless— body behind.</p>`
  }

  get combatVictoryMessage() {
    return `<p>The minotaur succumbs to its wounds.</p>`
  }

  get climaxLossMessage() {
    return `<p>Satisfied from the fucking, the minotaur leaves its bitch —you— behind as it shuffles back into the wilderness.</p>`
  }

  get climaxVictoryMessage() {
    return `<p>You sneak off as the minotaur has become docile from its recent orgasm.</p>`
  }

  // Seduction messages
  //-----------------

  get seducedMessage() {
    return `<p>The minotaur strokes its massive bovine cock. Pre-cum dribbling down from the tip and filling the air with overpowering musk.</p>`
  }

  get notInterestedMessage() {
    return `<p>The minotaur slaps you in the face as you try to approach it — clearly not impressed by what you're offering.</p>`
  }

  get grappleFailureMessage() {
    return `<p>The minotaur is horny as fuck and tries to pin you down, but you manage to dodge its attack.</p>`
  }

  // Fucking messages
  //-----------------

  get playerInitiatePositionMessage() {
    const you = this.player.who

    switch (this.fucking.name) {
      case "anal": {
        const your_ass = this.player.parts.anus.one
        return `
        <p>
          You turn your back towards the minotaur, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, ${you} look back over your shoulder at the minotaur.
          It snorts, unable to resist and with one hand on its cock and the other on your ass it brutally rams its bovine cock into ${your_ass}.
        </p>`
      }
      case "vaginal": {
        const your_pussy = this.player.parts.vagina.one
        return `
        <p>
          You turn your back towards the minotaur, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, ${you} look back at the minotaur from between your legs.
          Without any hesitation, the minotaur grabs you by your hips and rams its monstrous cock into ${your_pussy}.
        </p>`
      }
      case "blowjob": {
        const your_mouth = this.player.parts.mouth.one
        const your_hands = this.player.parts.hands.all
        return `
        <p>
          ${Grammar.capitalize(
            you
          )} get down on your knees in front of the minotaur.
          Facing its massive bovine cock, you grab it with ${your_hands} and jerk it a few times.
          Licking your lips hungrily, you open ${your_mouth} and swallow it whole.
        </p>`
      }
      case "boobjob": {
        const your_tits = this.player.parts.breasts.all
        const both_your_tits = this.player.parts.breasts.two
        return `
        <p>
          You get down on your knees in front of the minotaur.
          Cupping ${both_your_tits} and kneading them playfully.
          The minotaur takes you up on the offer and jams its throbbing cock in between ${your_tits}.
        </p>`
      }
      case "frotting": {
        const your_cock = this.player.parts.penis.all
        return `
        <p>
          You carefully approach the minotaur as it looks down at ${you} with a curious gaze.
          Slowly shuffling closer until ${your_cock} pokes against its inhumanly large bovine cock.
          The minotaur snorts as you wrap your fingers around the cocks and slowly start jerking them together.
        </p>`
      }
    }
    return ""
  }

  get enemyInitiatePositionMessage() {
    const you = this.player.who

    switch (this.fucking.name) {
      case "anal": {
        const your_ass = this.player.parts.anus.one
        return `
        <p>
          The minotaur grabs you by your wrist then pins ${you} face first down against the ground.
          Snorting like a bull, it hungrily looks down at your ass before brutally ramming its cock into ${your_ass}.
        </p>`
      }
      case "vaginal": {
        const your_pussy = this.player.parts.vagina.all
        const it =
          this.player.parts.vagina.quantity === 1 ? "it" : "one of them"
        return `
        <p>
          The minotaur's mighty hands grab you by the waist as it forces you to turn around and bend over.
          Grunting as it looks down at ${your_pussy} and then rams its brutish cock into ${it}.
        </p>`
      }
      case "blowjob": {
        const your_mouth = this.player.parts.mouth.one
        return `
        <p>
          The minotaur punches you in the gut.
          As soon as ${your_mouth} opens to cry out in pain, it shoves its massive cock through your lips.
          The thick bovine shaft drilling into ${your_mouth} and forcing itself down your throat.
        </p>`
      }
      case "boobjob": {
        const your_tits = this.player.parts.breasts.all
        return `
        <p>
          The minotaur overpowers you and pins ${you} to the floor under its weight.
          It sits down on top of you with its cock throbbing between ${your_tits}.
        </p>`
      }
      case "frotting": {
        const your_cock = this.player.parts.penis.all
        return `
        <p>
          The minotaur tramples over you, pinning ${you} down on the floor underneath its weight and strength.
          With its massive bovine cock throbbing against ${your_cock} it starts dry-humping you.
          Its heavy ball sack slapping against your bottom.
        </p>`
      }
    }
    return ""
  }

  get playerContinuePositionMessage() {
    const you = this.player.who

    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          ${Grammar.capitalize(
            you
          )} squeeze down on that cock that ceaselessly pounds away at your ass.
        </p>`
      case "vaginal":
        return `
        <p>
          Your inner walls squeeze down tight on that monstrous cock.
        </p>`
      case "blowjob":
        return `
        <p>
          You continue to bob your head back and forth as that massive bovine cocks fills your throat.
        </p>`
      case "boobjob": {
        const your_tits = this.player.parts.breasts.two
        return `
        <p>
          ${Grammar.capitalize(
            you
          )} squeeze ${your_tits} together around the minotaur's cock.
        </p>`
      }
      case "frotting": {
        const your_cock = this.player.parts.penis.all
        return `
        <p>
          ${Grammar.capitalize(
            you
          )} continue to stroke ${your_cock} and the minotaur's cock together.
        </p>`
      }
    }
    return ""
  }

  get enemyContinuePositionMessage() {
    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          The minotaur continues to ravage your ass.
        </p>`
      case "vaginal": {
        const your_pussy = this.player.parts.vagina.one
        return `
        <p>
          The minotaur pounds vigorously at ${your_pussy}.
        </p>`
      }
      case "blowjob":
        return `
        <p>
          The minotaur keeps fucking your face. Its hand on the back of your head, preventing your from escaping.
        </p>`
      case "boobjob":
        return `
        <p>
          The minotaur continues to fuck your cleavage.
        </p>`
      case "frotting": {
        const your_cock = this.player.parts.penis.all
        return `
        <p>
          The minotaur continues dry-humping ${your_cock}, pre-cum drooling all over you.
        </p>`
      }
    }
    return ""
  }

  get struggleSuccessMessage() {
    return `<p>You manage to wriggle out of the minotaur's grasp.</p>`
  }

  get struggleFailureMessage() {
    const you = this.player.who
    return `<p>You attempt to struggle free but the minotaur keeps ${you} firmly pinned down.</p>`
  }

  get pullOutMessage() {
    return `<p>
      The minotaur is about to climax — pull out at the last moment?
    </p>`
  }

  get climaxMessage() {
    const you = this.player.who
    const your_face = this.player.parts.face.all

    if (!this.fucking) {
      return `
        <p>
          The minotaur roars out with both hands around its cock, jerking itself off until it explodes into an overwhelming orgasm.
          Cum spurting all over the place with a few drops managing to land on ${your_face}.
          Half unconscious the minotaur falls down to the ground.
        </p>`
    }

    switch (this.fucking.name) {
      case "anal": {
        const your_ass = this.player.parts.anus.all
        return `
        <p>
          The minotaur roars out loudly as it's close to orgasm.
          With both hands around your waist it furiously ravages your ass until it finally explodes into it.
          Thick bovine cum slathering your insides and dribbling out of ${your_ass}.
          Overwhelmed with satisfaction, the minotaur falls down on its back — pulling ${you} down with it, impaled on its shaft.
          You then slowly get up, feeling that massive cock sliding out of your abused hole, beads of cum trickling down your thighs.
        </p>`
      }
      case "vaginal": {
        const your_pussy = this.player.parts.vagina.one
        return `
        <p>
          The minotaur picks up the pace, its monstrous cock sliding in and out of ${your_pussy}.
          You greedily squeeze down on it, moaning with pleasure.
          It doesn't take long for the monster to roar out and unload into ${your_pussy}.
          Hot bovine spunk building up inside of you and finally spurting out under its own pressure — dripping down your inner thighs.
          Snorting one last time and filled with satisfaction — the minotaur falls asleep, pinning ${you} under its weight.
          With some effort you manage to dislodge the cock while wriggling out from under the sleeping beast.
        </p>`
      }
      case "blowjob":
        return `
        <p>
          The minotaur places its hand against the back of your head, then thrusts vigorously — it's thick shaft sliding all the way down your throat, making it bulge visibly.
          It keeps pounding away at your face, tears rolling down your cheeks.
          You almost faint, but luckily the brute reaches its orgasm first.
          Thick salty cum filling your insides — rushing down your throat and spurting through your nose.
          Its grip weakening — you pull back quickly, feeling that monster cock sliding out of your throat before you are able to gasp for air.
        </p>`
      case "boobjob": {
        const your_tits = this.player.parts.breasts.all
        const your_face = this.player.parts.face.all
        return `
        <p>
          The minotaur groans and growls with its monstrous cock throbbing between ${your_tits}.
          It fucks your cleavage over and over like a wild beast.
          You even start to feel sore but ${you} can't help but moan out with joy — triggering the minotaur's climax.
          Thick bovine spunk spraying all over ${your_face}.
        </p>`
      }
      case "frotting": {
        const your_cock = this.player.parts.penis.all
        const your_face = this.player.parts.face.all
        const both = this.player.perks.has("conjoined") ? "all" : "both"
        return `
        <p>
          The minotaur growls as you keep rubbing ${your_cock} against his.
          Wrapping its hands around yours and forcing ${you} to continue jerking those cocks.
          You keep at it, slowly picking up the pace until neither of you can resist any longer.
          You ${both} climax at the same time — spunk mixing as it lands all over ${your_face} and chest.
        </p>`
      }
    }
    return ""
  }

  get infectionMessage() {
    return `<p><b>The minotaur's spunk corrupts your body…</b></p>`
  }
}
