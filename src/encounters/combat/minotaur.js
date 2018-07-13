import DefaultEncounter from "./_super"
import Minotaur from "entities/minotaur"
import { Position } from "../position"

class Anal extends Position {
  constructor(player, enemy) {
    super(player, ["anus"], enemy, ["penis"])
    this.name = "anal"
    this.infects = true
  }

  idle(p, e) {
    return `
      [foe]~>have [their] cock lodged deep inside [your.anus.one].`
  }

  playerStart(p, e) {
    return `
      [you] turn your back towards [foe], shaking your ass a few times before
      bending over. On all fours and with your ass pointing up, [you] look back
      over your shoulders at [foe]. [they]~>snort, unable to resist and with
      one hand on [their] cock and the other on your ass [they]~
      brutally >ram [their] bovine cock deep into [your.anus.one].`
  }

  enemyStart(p, e) {
    return `
      [foe]~>grab you by your wrist then >pin [you] face first down against the
      ground. Snorting hungrily like a bull, [foe]~>look down at your ass
      before brutally ramming [their] cock into [your.anus.one].`
  }

  playerContinue(p, e) {
    return `
      [you] squeeze down on that monstrous cock that ceaselessly keeps pounding
      away at your ass.`
  }

  enemyContinue(p, e) {
    return `[foe]~>continue to ravage your ass.`
  }

  climax(p, e) {
    return `
      [foe]~>roar out loudly as [they]~>be close to orgasm. With both hands
      around your waist [they] furiously >ravage your ass until [they]
      finally >explode into it. Thick bovine cum slathering your insides and
      dribbling out of [your.anus]. Overwhelmed with satisfaction, [foe]~>fall
      down on [their] back — pulling [you] down with [foe.them], impaling
      you on [their] shaft. As the beast recovers from its ordeal, [you]
      slowly and carefully get up. Feeling that massive cock sliding out of your
      abused hole while beads of cum trickle down your thighs.`
  }
}

class Vaginal extends Position {
  constructor(player, enemy) {
    super(player, ["vagina"], enemy, ["penis"])
    this.name = "vaginal"
    this.infects = true
  }

  idle(p, e) {
    return `[foe.whose] cock is throbbing deep inside [your.vagina.one].`
  }

  playerStart(p, e) {
    return `
      [you] turn your back towards [foe], shaking your ass a few times before
      bending over. On all fours and with your ass pointing up, [you] look back
      at [foe] from between your legs. Without any hesitation, [foe]~>grab you
      by your hips and >ram [their] monstrous cock into [your.vagina.one].`
  }

  enemyStart(p, e) {
    return `
      [foe.whose] mighty hands grab [you] by the waist as [foe.they]~>force you
      to turn around and bend over. Grunting as [they]~>look down at
      [your.vagina] and then >ram [foe.their] brutish cock into
      ${p.vagina.multiple ? "one of them" : "it"}.`
  }

  playerContinue(p, e) {
    return `your inner walls squeeze down tight on that monstrous cock.`
  }

  enemyContinue(p, e) {
    return `[foe]~>pound vigorously at [your.vagina.one].`
  }

  climax(p, e) {
    return `
      [foe]~>pick up the pace, [their] monstrous cock sliding in and out
      of [your.vagina.one]. [you] greedily squeeze down on it, moaning with
      pleasure. It doesn't take long for the monster to roar out and unload into
      [your.vagina.one]. Hot bovine spunk building up inside of [you] and
      finally spurting out under its own pressure — dripping down your inner
      thighs. Snorting one last time and filled with satisfaction — [foe]~>fall
      asleep, pinning [you] under [foe.their] weight. With some effort [you]
      manage to dislodge the cock while wriggling out from under the sleeping
      beast.`
  }
}

class Blowjob extends Position {
  constructor(player, enemy) {
    super(player, ["mouth"], enemy, ["penis"])
    this.name = "blowjob"
    this.infects = true
  }

  idle(p, e) {
    return `[foe.whose] cock is throbbing deep down your throat.`
  }

  playerStart(p, e) {
    return `
      [you] get down on your knees in front of [foe]. Facing [their] massive
      bovine cock, you grab it with [your.hands] and jerk it a few times.
      Licking your lips hungrily, you open [your.mouth.one] and swallow it
      whole.`
  }

  enemyStart(p, e) {
    return `
      [foe]~>punch [you] in the gut. As soon as [your.mouth.one] opens to cry
      out in pain, [foe.they]~>shove [their] massive cock through your lips.
      The thick bovine shaft drilling into [your.mouth.one] and forcing itself
      down your throat.`
  }

  playerContinue(p, e) {
    return `
      [you] continue to bob your head back and forth as that massive bovine
      cocks fills your throat.`
  }

  enemyContinue(p, e) {
    return `
      [foe]~>keep fucking your face. [their] hand on the back of your head,
      preventing you from escaping.`
  }

  climax(p, e) {
    return `
      [foe]~>place [their] hand against the back of your head, then >thrust
      vigorously — [their] thick shaft sliding all the way down your throat,
      making it bulge visibly. [they]~>keep pounding away at your face,
      tears rolling down your cheeks. [you] almost faint, but luckily the brute
      reaches [foe.their] orgasm first. Thick salty cum filling your insides —
      rushing down your throat and spurting through your nose. [whose] grip
      weakening — you pull back quickly, feeling that monster cock sliding out
      of your throat before being able to gasp for air.`
  }
}

class Boobjob extends Position {
  constructor(player, enemy) {
    super(player, ["breasts"], enemy, ["penis"])
    this.name = "boobjob"
    this.infects = false
  }

  idle(p, e) {
    return `
      [you] have got [your.breasts] squeezed tightly around [foe.whose]
      cock.`
  }

  playerStart(p, e) {
    return `
      [you] get down on your knees in front of [foe]. Cupping [your.breasts.two]
      and kneading them playfully. [foe]~>take you up on the offer and >jam
      [their] throbbing cock in between [your.breasts].`
  }

  enemyStart(p, e) {
    return `
      [foe]~>overpower [you] and >pin you to the floor under [foe.their] weight.
      [they]~>sit down on top of [you] with [foe.their] cock throbbing
      between [your.breasts].`
  }

  playerContinue(p, e) {
    return `[you] squeeze [your.breasts.two] together around [foe.whose] cock.`
  }

  enemyContinue(p, e) {
    return `[foe]~>continue to fuck your cleavage.`
  }

  climax(p, e) {
    return `
      [foe]~>groan and >growl with [their] monstrous cock throbbing between
      [your.breasts]. [foe.they]~>fuck your cleavage over and over like a wild
      beast. [you] even start to feel sore but you can't help but moan out with
      joy — triggering [foe.whose] climax. Thick bovine spunk spraying all over
      [your.face].`
  }
}

export default class MinotaurEncounter extends DefaultEncounter {
  constructor(game) {
    super(game, new Minotaur())

    this.addPosition(Anal)
    this.addPosition(Vaginal)
    this.addPosition(Blowjob)
    this.addPosition(Boobjob)
    //TODO - handjob
    //TODO - footjob
  }

  introMessage(p, e) {
    return `
      Suddenly a massive axe swings right above [your.head] and cuts through
      the flora. You are ambushed by a **[foe.title]**!`
  }

  mainMessage(p, e) {
    return `[you] are facing a **[foe.title]**.`
  }

  describeEnemyMessage(p, e) {
    let text = `
      You have read about these in books. A creature with the head of a bull and
      the body of a man.`

    if (p.body.size < 190) {
      text += `
        Towering over [you], [foe.they] must be at least 7 feet tall.`
    } else {
      text += `
        You estimate [foe.them] to be at least 7 feet tall.`
    }

    text += `
      Brandishing an oversized axe and wearing no clothing or jewellery. The
      tales failed to mention a considerable detail — [foe.their] monstrous
      bovine cock, throbbing and filling the air with potent musk!`

    return text
  }

  playerAttackedMessage(p, e) {
    return `[foe]~>swing [their] massive axe at [you].`
  }

  combatLossMessage(p, e) {
    return `
      [foe]~>roar victoriously, swinging [their] axe in the air a few times
      before walking away. Leaving your —almost lifeless— body behind.`
  }

  combatVictoryMessage(p, e) {
    return `[foe]~>succumb to [their] wounds.`
  }

  climaxLossMessage(p, e) {
    return `
      Satisfied from the fucking, [foe]~>leave [their] bitch —[you]— behind
      as [foe.they]~>shuffle back into the wilderness.`
  }

  climaxVictoryMessage(p, e) {
    return `
      [you] sneak off as [foe]~>have become docile from [their] recent
      orgasm.`
  }

  seducedMessage(p, e) {
    return `
      [foe]~>stroke [their] massive bovine cock — Pre-cum dribbling down
      from [their] tip and filling the air with overpowering musk.`
  }

  // TODO add gradations of disinterest ?
  notInterestedMessage(p, e) {
    return `
      [foe]~>slap [you] in the face as you try to approach [foe.them] — clearly
      not impressed by what you're offering.`
  }

  grappleFailureMessage(p, e) {
    return `
      [foe]~>be horny as fuck and >try to pin [you] down, but you manage to
      dodge [foe.their] assault.`
  }

  infectionMessage(p, e) {
    return `**[foe.whose] spunk corrupts your body…**`
  }

  struggleSuccessMessage(p, e) {
    return `[you] manage to wriggle out of [foe.whose] grasp.`
  }

  struggleFailureMessage(p, e) {
    return `
      [you] attempt to struggle free but [foe]~>keep you firmly pinned down.`
  }

  pullOutMessage(p, e) {
    return `
      [foe]~>be about to climax — pull out at the last moment?`
  }

  climaxMessage(p, e) {
    return `
      [foe]~>roar out with both hands around [their] cock, jerking
      [themself] off until [they]~>explode into an overwhelming orgasm.
      Cum spurting all over the place with a few drops managing to land on
      [your.face]. Half unconscious [foe]~>fall down to the ground.`
  }
}
