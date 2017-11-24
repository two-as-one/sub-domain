import DefaultEncounter from "./_super"
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
      // 'vagina':   'doggystyle',
      // 'hands':    'handjob',
      // 'feet':     'footjob',
    ]
  }

  // Combat messages
  //----------------

  get introMessage() {
    return `
      <p>
        Suddenly a massive axe swings right above your head and cuts through the flora. You are ambushed by a <b>minotaur</b>!
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
        case "anal":
          return `<p>The <b>minotaur</b> has its cock lodged deep inside ${
            this.player.parts.anus.one
          }.</p>`
        case "vaginal":
          return `<p>The <b>minotaur</b>'s cock is throbbing deep inside ${
            this.player.parts.vagina.one
          }.</p>`
        case "blowjob":
          return `<p>The <b>minotaur</b>'s cock is throbbing deep down your throat.</p>`
        case "boobjob":
          return `<p>You have ${
            this.player.parts.breasts.all
          } squeezed tightly around the <b>minotaur</b>'s cock.</p>`
        case "frotting":
          return `<p>You have ${
            this.player.parts.hands.all
          } wrapped around the <b>minotaur</b>'s and ${
            this.player.parts.penis.all
          }.</p>`
      }
    }
  }

  get attackMessage() {
    return `<p>You swing your ${this.player.weapon.name} at the minotaur.</p>`
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

  get fleeSuccessMessage() {
    return `<p>You manage to run away from the minotaur!</p>`
  }

  get fleeFailureMessage() {
    return `<p>You try to flee but the minotaur stops you in your tracks!</p>`
  }

  // Seduction messages
  //-----------------

  get seducedMessage() {
    return `<p>The minotaur strokes its massive bovine cock. Pre-cum dribbling down from the tip and filling the air with overpowering musk.</p>`
  }

  get notInterestedMessage() {
    return `<p>The minotaur isn't interested in what you're offering.</p>`
  }

  get grappleFailureMessage() {
    return `<p>The minotaur is horny as fuck and tries to pin you down, but you manage to dodge its attack.</p>`
  }

  // Fucking messages
  //-----------------

  get playerInitiatePositionMessage() {
    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          You turn your back towards the minotaur, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, you look back over your shoulder at the minotaur.
          It snorts, unable to resist and with one hand on its cock and the other on your ass it brutally rams its bovine cock into ${
            this.player.parts.anus.one
          }.
        </p>`
      case "vaginal":
        return `
        <p>
          You turn your back towards the minotaur, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, you look back at the minotaur from between your legs.
          Without any hesitation, the minotaur grabs you by your hips and rams its monstrous cock into ${
            this.player.parts.vagina.one
          }.
        </p>`
      case "blowjob":
        return `
        <p>
          You get down on your knees in front of the minotaur.
          Facing its massive bovine cock, you grab it with ${
            this.player.parts.hands.all
          } and jerk it a few times.
          Licking your lips hungrily, you open ${
            this.player.parts.mouth.one
          } and swallow it whole.
        </p>`
      case "boobjob":
        return `
        <p>
          You get down on your knees in front of the minotaur.
          Cupping ${this.player.parts.breasts.all} and kneading them playfully.
          The minotaur takes you up on the offer and jams its throbbing cock in between ${
            this.player.parts.breasts.all
          }.
        </p>`
      case "frotting":
        return `
        <p>
          You carefully approach the minotaur as it looks down at you with a curious gaze.
          Slowly shuffling closer until ${
            this.player.parts.penis.one
          } pokes against its inhumanly large bovine cock.
          The minotaur snorts as you wrap your fingers around the cocks and slowly start jerking them together.
        </p>`
    }
    return ""
  }

  get enemyInitiatePositionMessage() {
    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          The minotaur grabs you by your wrist then pins you face first down against the ground.
          Snorting like a bull, it hungrily looks down at your ass before brutally ramming its cock into ${
            this.player.parts.anus.one
          }.
        </p>`
      case "vaginal":
        return `
        <p>
          The minotaur's mighty hands grab you by the waist as it forces you to turn around and bend over.
          Grunting as it looks down at ${
            this.player.parts.vagina.all
          } and then rams its brutish cock into ${
          this.player.parts.vagina.quantity === 1 ? "it" : "one of them"
        }.
        </p>`
      case "blowjob":
        return `
        <p>
          The minotaur punches you in the gut.
          As soon as ${
            this.player.parts.mouth.one
          } opens to cry out in pain, it shoves its massive cock through your lips.
          The thick bovine shaft drilling into ${
            this.player.parts.mouth.one
          } and forcing itself down your throat.
        </p>`
      case "boobjob":
        return `
        <p>
          The minotaur overpowers you and pins you to the floor under its weight.
          It sits down on top of you with its cock throbbing between ${
            this.player.parts.breasts.all
          }.
        </p>`
      case "frotting":
        return `
        <p>
          The minotaur tramples over you, pinning you down on the floor underneath its weight and strength.
          With its massive bovine cock throbbing against ${
            this.player.parts.penis.all
          } it starts dry-humping you.
          Its heavy ball sack slapping against your bottom.
        </p>`
    }
    return ""
  }

  get playerContinuePositionMessage() {
    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          You squeeze down on that cock that ceaselessly pounds away at your ass.
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
      case "boobjob":
        return `
        <p>
          You squeeze ${
            this.player.parts.breasts.all
          } together around the minotaur's cock.
        </p>`
      case "frotting":
        return `
        <p>
          You continue to stroke ${
            this.player.parts.penis.all
          } and the minotaur's cock together.
        </p>`
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
      case "vaginal":
        return `
        <p>
          The minotaur pounds vigurously at ${this.player.parts.vagina.one}.
        </p>`
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
      case "frotting":
        return `
        <p>
          The minotaur keeps humping against ${
            this.player.parts.penis.all
          }, pre-cum drooling all over you.
        </p>`
    }
    return ""
  }

  get struggleSuccessMessage() {
    return `<p>You manage to wriggle out of the minotaur's grasp.</p>`
  }

  get struggleFailureMessage() {
    return `<p>You attempt to struggle free but the minotaur keeps you firmly pinned down.</p>`
  }

  get pullOutMessage() {
    return `<p>
      The minotaur is about to climax — pull out at the last moment?
    </p>`
  }

  get climaxMessage() {
    if (!this.fucking) {
      return `
        <p>
          The minotaur roars out with both hands around its cock, jerking itself off until it explodes into an overwhelming orgasm.
          Cum spurting all over the place with a few drops managing to land on your face.
          Half unconscious the minotaur falls down to the ground.
        </p>`
    }

    switch (this.fucking.name) {
      case "anal":
        return `
        <p>
          The minotaur roars out loudly as it's close to orgasm.
          With both hands around your waist it furiously ravages your ass until it finally explodes into it.
          Thick bovine cum slathering your insides and dribbling out of ${
            this.player.parts.anus.all
          }.
          Overwhelmed with satisfaction, the minotaur falls down on its back — pulling you down with it, impaled on its shaft.
          You then slowly get up, feeling that massive cock sliding out of your abused hole, beads of cum trickling down your thighs.
        </p>`
      case "vaginal":
        return `
        <p>
          The minotaur picks up the pace, its monstrous cock sliding in and out of ${
            this.player.parts.vagina.one
          }.
          You greedily squeeze down on it, moaning with pleasure.
          It doesn't take long for the monster to roar out and unload into ${
            this.player.parts.vagina.one
          }.
          Hot bovine spunk building up inside of you and finally spurting out under its own pressure — dripping down your inner thighs.
          Snorting one last time and filled with satisfaction — the minotaur falls asleep, pinning you under its weight.
          With some effort you manage to dislodge the cock while wriggling out from under the sleeping beast.
        </p>`
      case "blowjob":
        return `
        <p>
          The minotaur places its hand against the back of your head, then thrusts vigurously — it's thick shaft sliding all the way down your throat, making it bulge visibly.
          It keeps pounding away at your face, tears rolling down your cheeks.
          You almost faint, but luckily the brute reaches its orgasm first.
          Thick salty cum filling your insides — rushing down your throat and spurting through your nose.
          Its grip weakening — you pull back quickly, feeling that monster cock sliding out of your throat before you are able to gasp for air.
        </p>`
      case "boobjob":
        return `
        <p>
          The minotaur groans and growls with its monstrous cock throbbing between ${
            this.player.parts.breasts.all
          }.
          It fucks your cleavage over and over like a wild beast.
          You even start to feel sore but you can't help but moan out with joy — triggering the minotaur's climax.
          Thick bovine spunk spraying all over your face.
        </p>`
      case "frotting":
        return `
        <p>
          The minotaur growls as you keep rubbing ${
            this.player.parts.penis.all
          } against his.
          Wrapping its hands around yours and forcing you to continue jerking those cocks.
          You keep at it, slowly picking up the pace until neither of you can resist any longer.
          You both climax at the same time — spunk mixing as it lands all over your chest and face.
        </p>`
    }
    return ""
  }

  get infectionMessage() {
    return `<p><b>The minotaur's spunk corrupts your body…</b></p>`
  }
}
