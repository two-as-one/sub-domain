import DefaultEncounter from "./_super"
import G from "utils/grammar"
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
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `Suddenly a massive axe swings right above ${player.head.all} and cuts through the flora. ${player.who} are ambushed by a <b>${enemy.title}</b>!`

    return G.clean(text)
  }

  get describeEnemyMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    let text = `You have read about these in books. A creature with the head of a bull and the body of a man.`

    if (this.player.body.size < 190) {
      // prettier-ignore
      text += ` Towering over ${player.who}, ${enemy.they} must be at least 7 feet tall.`
    } else {
      // prettier-ignore
      text += ` You estimate ${enemy.them} to be at least 7 feet tall.`
    }

    // prettier-ignore
    text += ` Brandishing an oversized axe and wearing no clothing or jewellery.
              The tales failed to mention a considerable detail — ${enemy.their} monstrous bovine cock, throbbing and filling the air with potent musk!`

    return G.clean(text)
  }

  get mainMessage() {
    const enemy = this.enemy
    const player = this.player

    let text

    if (!this.fucking) {
      // prettier-ignore
      text = `${player.who} are facing a <b>${enemy.title}</b>.`
    } else {
      switch (this.fucking.name) {
        case "anal":
          // prettier-ignore
          text = `${G.verb(enemy.who, 'have')} ${enemy.their} cock lodged deep inside ${player.anus.one}.`
          break
        case "vaginal":
          // prettier-ignore
          text = `${enemy.whose} cock is throbbing deep inside ${player.vagina.one}.`
          break
        case "blowjob":
          // prettier-ignore
          text = `${enemy.whose} cock is throbbing deep down your throat.`
          break
        case "boobjob":
          // prettier-ignore
          text = `${player.who} have got ${player.breasts.all} squeezed tightly around ${enemy.whose} cock.`
          break
        case "frotting":
          // prettier-ignore
          text = `${player.who} have got ${player.hands.all} wrapped around the ${enemy.whose} and ${player.penis.all}.`
          break
      }
    }

    return G.clean(text)
  }

  get playerAttackdeMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'swing')} ${enemy.their} massive axe at ${player.who}.`

    return G.clean(text)
  }

  get combatLossMessage() {
    const enemy = this.enemy

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'roar')} victoriously, swinging ${enemy.their} axe in the air a few times before walking away. Leaving your —almost lifeless— body behind.`

    return G.clean(text)
  }

  get combatVictoryMessage() {
    const enemy = this.enemy

    // prettier-ignore
    const text =`${G.verb(enemy.who, 'succumb')} to ${enemy.their} wounds.`

    return G.clean(text)
  }

  get climaxLossMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `Satisfied from the fucking, ${G.verb(enemy.who, 'leave')} ${enemy.their} bitch —${player.who}— behind as ${G.verb(enemy.they, 'shuffle')} back into the wilderness.`

    return G.clean(text)
  }

  get climaxVictoryMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${player.who} sneak off as ${G.verb(enemy.who, 'have')} become docile from ${enemy.their} recent orgasm.`

    return G.clean(text)
  }

  // Seduction messages
  //-----------------

  get seducedMessage() {
    const enemy = this.enemy

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'stroke')} ${enemy.their} massive bovine cock — Pre-cum dribbling down from ${enemy.their} tip and filling the air with overpowering musk.`

    return G.clean(text)
  }

  get notInterestedMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'slap')} ${player.who} in the face as you try to approach ${enemy.them} — clearly not impressed by what you're offering.`

    return G.clean(text)
  }

  get grappleFailureMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'be')} horny as fuck and ${G.verb(enemy.who, 'try', false)} to pin ${player.who} down, but you manage to dodge ${enemy.their} attack.`

    return G.clean(text)
  }

  get infectionMessage() {
    const enemy = this.enemy

    // prettier-ignore
    const text = `<b>${enemy.whose} spunk corrupts your body…</b>`

    return G.clean(text)
  }

  get struggleSuccessMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${player.who} manage to wriggle out of ${enemy.whose} grasp.`

    return G.clean(text)
  }

  get struggleFailureMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${player.who} attempt to struggle free but ${G.verb(enemy.who, 'keep')} you firmly pinned down.`

    return G.clean(text)
  }

  get pullOutMessage() {
    const enemy = this.enemy

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'be')} about to climax — pull out at the last moment?`

    return G.clean(text)
  }

  // Fucking messages
  //-----------------

  get playerInitiatePositionMessage() {
    const enemy = this.enemy
    const player = this.player

    let text = ""

    switch (this.fucking.name) {
      case "anal":
        // prettier-ignore
        text = `
          ${player.who} turn your back towards ${enemy.who}, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, ${player.who} look back over your shoulders at ${enemy.who}.
          ${G.verb(enemy.they, 'snort')}, unable to resist and with one hand on ${enemy.their} cock and the other on your ass ${enemy.they} brutally ${G.verb(enemy.they, 'ram', false)} ${enemy.their} bovine cock into ${player.anus.one}.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${player.who} turn your back towards ${enemy.who}, shaking your ass a few times before bending over.
          On all fours and with your ass pointing up, ${player.who} look back at ${enemy.who} from between your legs.
          Without any hesitation, ${G.verb(enemy.who, 'grab')} you by your hips and ${G.verb(enemy.they, 'ram', false)} ${enemy.their} monstrous cock into ${player.vagina.one}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${player.who} get down on your knees in front of ${enemy.who}.
          Facing ${enemy.their} massive bovine cock, you grab it with ${player.hands.all} and jerk it a few times.
          Licking your lips hungrily, you open ${player.mouth.one} and swallow it whole.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${player.who} get down on your knees in front of ${enemy.who}.
          Cupping ${player.breasts.two} and kneading them playfully.
          ${G.verb(enemy.who, 'take')} you up on the offer and ${G.verb(enemy.they, 'jam', false)} ${enemy.their} throbbing cock in between ${player.breasts.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${player.who} carefully approach ${enemy.who} as ${G.verb(enemy.they, 'look')} down at you with a curious gaze.
          Slowly shuffling closer until ${player.penis.all} pokes against ${enemy.their} inhumanly large bovine cock.
          ${G.verb(enemy.who, 'snort')} as ${player.who} wrap your fingers around the cocks and slowly start jerking them together.`
        break
    }

    return G.clean(text)
  }

  get enemyInitiatePositionMessage() {
    const enemy = this.enemy
    const player = this.player

    let text = ""

    switch (this.fucking.name) {
      case "anal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'grab')} you by your wrist then ${G.verb(enemy.who, 'pin', false)} ${player.who} face first down against the ground.
          Snorting hungrily like a bull, ${G.verb(enemy.they, 'look')} down at your ass before brutally ramming ${enemy.their} cock into ${player.anus.one}.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${enemy.whose} mighty hands grab ${player.who} by the waist as ${G.verb(enemy.they, 'force')} you to turn around and bend over.
          Grunting as ${G.verb(enemy.they, 'look')} down at ${player.vagina.all} and then ${G.verb(enemy.they, 'ram', false)} ${enemy.their} brutish cock into ${player.vagina.multiple ? 'one of them' : 'it'}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'punch')} ${player.who} in the gut.
          As soon as ${player.mouth.one} opens to cry out in pain, ${G.verb(enemy.they, 'shove')} ${enemy.their} massive cock through your lips.
          The thick bovine shaft drilling into ${player.mouth.one} and forcing itself down your throat.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'overpower')} ${player.who} and ${G.verb(enemy.who, 'pin', false)} you to the floor under ${enemy.their} weight.
          ${G.verb(enemy.they, 'sit')} down on top of ${player.who} with ${enemy.their} cock throbbing between ${player.breasts.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'trample')} over ${player.who}, pinning you down on the floor underneath ${enemy.their} weight and strength.
          With ${enemy.their} massive bovine cock throbbing against ${player.penis.all} ${G.verb(enemy.they, 'start')} dry-humping ${player.who}.
          ${enemy.their} heavy ball sack slapping against your bottom.`
        break
    }

    return G.clean(text)
  }

  get playerContinuePositionMessage() {
    const enemy = this.enemy
    const player = this.player

    let text = ""

    switch (this.fucking.name) {
      case "anal":
        // prettier-ignore
        text = `
          ${player.who} squeeze down on that cock that ceaselessly pounds away at your ass.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          your inner walls squeeze down tight on that monstrous cock.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${player.who} continue to bob your head back and forth as that massive bovine cocks fills your throat.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${player.who} squeeze ${player.breasts.two} together around ${enemy.whose} cock.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${player.who} continue to stroke ${player.penis.all} and ${enemy.whose} cock together.`
        break
    }

    return G.clean(text)
  }

  get enemyContinuePositionMessage() {
    const enemy = this.enemy
    const player = this.player

    let text = ""

    switch (this.fucking.name) {
      case "anal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'continue')} to ravage your ass.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'pound')} vigorously at ${player.vagina.one}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'keep')} fucking your face. ${enemy.their} hand on the back of your head, preventing you from escaping.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'continue')} to fuck your cleavage.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'continue')} dry-humping ${player.penis.all}, pre-cum drooling all over ${player.who}.`
        break
    }

    return G.clean(text)
  }

  get climaxMessage() {
    const enemy = this.enemy
    const player = this.player

    let text = ""

    if (!this.fucking) {
      // prettier-ignore
      text = `
          ${G.verb(enemy.who, 'roar')} out with both hands around ${enemy.their} cock, jerking ${enemy.themself} off until ${G.verb(enemy.they, 'explode')} into an overwhelming orgasm.
          Cum spurting all over the place with a few drops managing to land on ${player.face.all}.
          Half unconscious ${G.verb(enemy.who, 'fall')} down to the ground.`
    }

    switch (this.fucking.name) {
      case "anal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'roar')} out loudly as ${G.verb(enemy.they, 'be')} close to orgasm.
          With both hands around your waist ${enemy.they} furiously ${G.verb(enemy.they, 'ravage', false)} your ass until ${enemy.they} finally ${G.verb(enemy.they, 'explode', false)} into it.
          Thick bovine cum slathering your insides and dribbling out of ${player.anus.all}.
          Overwhelmed with satisfaction, ${G.verb(enemy.who, 'fall')} down on ${enemy.their} back — pulling ${player.who} down with ${enemy.them} while being impaled on ${enemy.their} shaft.
          ${player.who} then slowly get up, feeling that massive cock sliding out of your abused hole, beads of cum trickling down your thighs.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'pick')} up the pace, ${enemy.their} monstrous cock sliding in and out of ${player.vagina.one}.
          ${player.who} greedily squeeze down on it, moaning with pleasure.
          It doesn't take long for the monster to roar out and unload into ${player.vagina.one}.
          Hot bovine spunk building up inside of ${player.who} and finally spurting out under its own pressure — dripping down your inner thighs.
          Snorting one last time and filled with satisfaction — ${G.verb(enemy.who, 'fall')} asleep, pinning ${player.who} under ${enemy.their} weight.
          With some effort ${player.who} manage to dislodge the cock while wriggling out from under the sleeping beast.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'place')} ${enemy.their} hand against the back of your head, then ${G.verb(enemy.who, 'thrust', false)} vigorously — ${enemy.their} thick shaft sliding all the way down your throat, making it bulge visibly.
          ${G.verb(enemy.they, 'keep')} pounding away at your face, tears rolling down your cheeks.
          ${player.who} almost faint, but luckily the brute reaches ${enemy.their} orgasm first.
          Thick salty cum filling your insides — rushing down your throat and spurting through your nose.
          ${enemy.whose} grip weakening — you pull back quickly, feeling that monster cock sliding out of your throat before being able to gasp for air.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'groan')} and ${G.verb(enemy.who, 'growl', false)} with ${enemy.their} monstrous cock throbbing between ${player.breasts.all}.
          ${G.verb(enemy.they, 'fuck')} your cleavage over and over like a wild beast.
          ${player.who} even start to feel sore but you can't help but moan out with joy — triggering ${enemy.whose} climax.
          Thick bovine spunk spraying all over ${player.face.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'growl')} as ${player.who} keep rubbing ${player.penis.all} against ${enemy.theirs} own.
          Wrapping ${enemy.their} hands around yours and forcing ${player.who} to continue jerking those cocks.
          ${player.who} keep at it, slowly picking up the pace until neither of you can resist any longer.
          ${player.who} and ${enemy.who} climax at the same time — spunk mixing as it lands all over ${player.face.all} and chest.`
        break
    }

    return G.clean(text)
  }
}
