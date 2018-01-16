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
    const text = `Suddenly a massive axe swings right above ${player.head.all} and cuts through the flora. ${G.verb(player.they, 'are')} ambushed by a <b>${enemy.title}</b>!`

    return G.clean(text)
  }

  get describeEnemyMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    let text = `${G.verb(player.they, 'have')} read about these in books. A creature with the head of a bull and the body of a man.`

    if (this.player.body.size < 190) {
      // prettier-ignore
      text += ` Towering over ${player.them}, ${enemy.they} must be at least 7 feet tall.`
    } else {
      // prettier-ignore
      text += ` ${G.verb(player.they, 'estimate')} ${enemy.them} to be at least 7 feet tall.`
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
      text = `${G.verb(player.they, 'are')} facing a <b>${enemy.title}</b>.`
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
          text = `${enemy.whose} cock is throbbing deep down ${player.their} throat.`
          break
        case "boobjob":
          // prettier-ignore
          text = `${G.verb(player.they, 'have')} got ${player.breasts.all} squeezed tightly around ${enemy.whose} cock.`
          break
        case "frotting":
          // prettier-ignore
          text = `${G.verb(player.they, 'have')} got ${player.hands.all} wrapped around the ${enemy.whose} and ${player.penis.all}.`
          break
      }
    }

    return G.clean(text)
  }

  get playerAttackdeMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'swing')} ${enemy.their} massive axe at ${player.them}.`

    return G.clean(text)
  }

  get combatLossMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'roar')} victoriously, swinging ${enemy.their} axe in the air a few times before walking away. Leaving ${player.their} —almost lifeless— body behind.`

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
    const text = `${G.verb(player.who, 'sneak')} off as ${G.verb(enemy.who, 'have')} become docile from ${enemy.their} recent orgasm.`

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
    const text = `${G.verb(enemy.who, 'slap')} ${player.them} in the face as ${G.verb(player.they, 'try')} to approach ${enemy.them} — clearly not impressed by what ${G.verb(player.they, 'be')} offering.`

    return G.clean(text)
  }

  get grappleFailureMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(enemy.who, 'be')} horny as fuck and ${G.verb(enemy.who, 'try', false)} to pin ${player.them} down, but ${G.verb(player.they, 'manage')} to dodge ${enemy.their} attack.`

    return G.clean(text)
  }

  get infectionMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `<b>${enemy.whose} spunk corrupts ${player.their} body…</b>`

    return G.clean(text)
  }

  get struggleSuccessMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(player.who, 'manage')} to wriggle out of ${enemy.whose} grasp.`

    return G.clean(text)
  }

  get struggleFailureMessage() {
    const enemy = this.enemy
    const player = this.player

    // prettier-ignore
    const text = `${G.verb(player.who, 'attempt')} to struggle free but ${G.verb(enemy.who, 'keep')} ${player.them} firmly pinned down.`

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
          ${G.verb(player.who, 'turn')} ${player.their} back towards ${enemy.who}, shaking ${player.their} ass a few times before bending over.
          On all fours and with ${player.their} ass pointing up, ${G.verb(player.who, 'look')} back over ${player.their} shoulder at ${enemy.who}.
          ${G.verb(enemy.they, 'snort')}, unable to resist and with one hand on ${enemy.their} cock and the other on ${player.their} ass ${enemy.they} brutally ${G.verb(enemy.they, 'ram', false)} ${enemy.their} bovine cock into ${player.anus.one}.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'turn')} ${player.their} back towards ${enemy.who}, shaking ${player.their} ass a few times before bending over.
          On all fours and with ${player.their} ass pointing up, ${G.verb(player.who, 'look')} back at ${enemy.who} from between ${player.their} legs.
          Without any hesitation, ${G.verb(enemy.who, 'grab')} ${player.them} by ${player.their} hips and ${G.verb(enemy.they, 'ram', false)} ${enemy.their} monstrous cock into ${player.vagina.one}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'get')} down on ${player.their} knees in front of ${enemy.who}.
          Facing ${enemy.their} massive bovine cock, ${G.verb(player.they, 'grab')} it with ${player.hands.all} and ${G.verb(player.they,'jerk', false)} it a few times.
          Licking ${player.their} lips hungrily, ${G.verb(player.they, 'open')} ${player.mouth.one} and ${G.verb(player.they, 'swallow', false)} it whole.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'get')} down on ${player.their} knees in front of ${enemy.who}.
          Cupping ${player.breasts.two} and kneading them playfully.
          ${G.verb(enemy.who, 'take')} ${player.them} up on the offer and ${G.verb(enemy.they, 'jam', false)} ${enemy.their} throbbing cock in between ${player.breasts.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${player.who} carefully ${G.verb(player.who, 'approach', false)} ${enemy.who} as ${G.verb(enemy.they, 'look')} down at ${player.them} with a curious gaze.
          Slowly shuffling closer until ${player.penis.all} pokes against ${enemy.their} inhumanly large bovine cock.
          ${G.verb(enemy.who, 'snort')} as ${G.verb(player.they, 'wrap')} ${player.their} fingers around the cocks and slowly start jerking them together.`
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
          ${G.verb(enemy.who, 'grab')} ${player.who} by ${player.their} wrist then ${G.verb(enemy.who, 'pin', false)} ${player.them} face first down against the ground.
          Snorting hungrily like a bull, ${G.verb(enemy.they, 'look')} down at ${player.their} ass before brutally ramming ${enemy.their} cock into ${player.anus.one}.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${enemy.whose} mighty hands grab ${player.who} by the waist as ${G.verb(enemy.they, 'force')} ${player.them} to turn around and bend over.
          Grunting as ${G.verb(enemy.they, 'look')} down at ${player.vagina.all} and then ${G.verb(enemy.they, 'ram', false)} ${enemy.their} brutish cock into ${player.vagina.multiple ? 'one of them' : 'it'}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'punch')} ${player.who} in the gut.
          As soon as ${player.mouth.one} opens to cry out in pain, ${G.verb(enemy.they, 'shove')} ${enemy.their} massive cock through ${player.their} lips.
          The thick bovine shaft drilling into ${player.mouth.one} and forcing itself down your throat.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'overpower')} ${player.who} and ${G.verb(enemy.who, 'pin', false)} ${player.them} to the floor under ${enemy.their} weight.
          ${G.verb(enemy.they, 'sit')} down on top of ${player.them} with ${enemy.their} cock throbbing between ${player.breasts.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'trample')} over ${player.who}, pinning ${player.them} down on the floor underneath ${enemy.their} weight and strength.
          With ${enemy.their} massive bovine cock throbbing against ${player.penis.all} ${G.verb(enemy.they, 'start')} dry-humping ${player.them}.
          ${enemy.their} heavy ball sack slapping against ${player.their} bottom.`
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
          ${G.verb(player.who, 'squeeze')} down on that cock that ceaselessly pounds away at ${player.their} ass.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${player.their} inner walls squeeze down tight on that monstrous cock.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'continue')} to bob ${player.their} head back and forth as that massive bovine cocks fills ${player.their} throat.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'squeeze')} ${player.breasts.two} together around ${enemy.whose} cock.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(player.who, 'continue')} to stroke ${player.penis.all} and ${enemy.whose} cock together.`
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
          ${G.verb(enemy.who, 'continue')} to ravage ${player.their} ass.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'pound')} vigorously at ${player.vagina.one}.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'keep')} fucking ${player.their} face. ${enemy.their} hand on the back of ${player.their} head, preventing ${player.them} from escaping.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'continue')} to fuck ${player.their} cleavage.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'continue')} dry-humping ${player.penis.all}, pre-cum drooling all over ${player.them}.`
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
          With both hands around ${player.their} waist ${enemy.they} furiously ${G.verb(enemy.they, 'ravage', false)} ${player.their} ass until ${enemy.they} finally ${G.verb(enemy.they, 'explode', false)} into it.
          Thick bovine cum slathering ${player.their} insides and dribbling out of ${player.anus.all}.
          Overwhelmed with satisfaction, ${G.verb(enemy.who, 'fall')} down on ${enemy.their} back — pulling ${player.them} down with ${enemy.them} while being impaled on ${enemy.their} shaft.
          ${player.who} then slowly ${G.verb(player.who, 'get', false)} up, feeling that massive cock sliding out of ${player.their} abused hole, beads of cum trickling down ${player.their} thighs.`
        break
      case "vaginal":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'pick')} up the pace, ${enemy.their} monstrous cock sliding in and out of ${player.vagina.one}.
          ${player.who} greedily ${G.verb(player.who, 'squeeze', false)} down on it, moaning with pleasure.
          It doesn't take long for the monster to roar out and unload into ${player.vagina.one}.
          Hot bovine spunk building up inside of ${player.them} and finally spurting out under its own pressure — dripping down ${player.their} inner thighs.
          Snorting one last time and filled with satisfaction — ${G.verb(enemy.who, 'fall')} asleep, pinning ${player.them} under ${enemy.their} weight.
          With some effort ${G.verb(player.who, 'manage')} to dislodge the cock while wriggling out from under the sleeping beast.`
        break
      case "blowjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'place')} ${enemy.their} hand against the back of ${player.whose} head, then ${G.verb(enemy.who, 'thrust', false)} vigorously — ${enemy.their} thick shaft sliding all the way down ${player.their} throat, making it bulge visibly.
          ${G.verb(enemy.they, 'keep')} pounding away at ${player.their} face, tears rolling down ${player.their} cheeks.
          ${player.who} almost ${G.verb(player.who, 'faint', false)}, but luckily the brute reaches ${enemy.their} orgasm first.
          Thick salty cum filling ${player.their} insides — rushing down ${player.their} throat and spurting through ${player.their} nose.
          ${enemy.whose} grip weakening — ${G.verb(player.they, 'pull')} back quickly, feeling that monster cock sliding out of ${player.their} throat before ${player.they} are able to gasp for air.`
        break
      case "boobjob":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'groan')} and ${G.verb(enemy.who, 'growl', false)} with ${enemy.their} monstrous cock throbbing between ${player.breasts.all}.
          ${G.verb(enemy.they, 'fuck')} ${player.their} cleavage over and over like a wild beast.
          ${player.who} even ${G.verb(player.who, 'start', false)} to feel sore but ${player.they} can't help but moan out with joy — triggering ${enemy.whose} climax.
          Thick bovine spunk spraying all over ${player.face.all}.`
        break
      case "frotting":
        // prettier-ignore
        text = `
          ${G.verb(enemy.who, 'growl')} as ${G.verb(player.who, 'keep')} rubbing ${player.penis.all} against ${enemy.theirs} own.
          Wrapping ${enemy.their} hands around ${player.theirs} and forcing ${player.who} to continue jerking those cocks.
          ${G.verb(player.who, 'keep')} at it, slowly picking up the pace until neither of you can resist any longer.
          ${player.who} and ${enemy.who} climax at the same time — spunk mixing as it lands all over ${player.face.all} and chest.`
        break
    }

    return G.clean(text)
  }
}
