import DefaultEncounter from "./_super"
import Minotaur from "entities/minotaur"
import { Position } from "../position"

class Anal extends Position {
  constructor(player, enemy) {
    super(player, ["anus"], enemy, ["penis"])
    this.name = "anal"
    this.infects = true
  }

  idle() {
    return `
      [foe]~>have [all of:their:adjective:penis] lodged deep inside
      [your:adjective:anus].`
  }

  playerStart() {
    return `
      [you] turn your back towards [foe], shaking [your:adjective:butt] a few
      times before bending over. On all fours and with [your:butt] pointing up,
      [you] look back over your shoulders at [foe]. [they]~>snort, unable to
      resist and with one hand on [their:penis] and the other on
      [your:adjective:butt], [they(foe)]~ brutally >ram
      [all of:their:adjective:penis] deep into [one of:your:adjective:anus].`
  }

  enemyStart() {
    return `
      [foe]~>grab you by your wrist then >pin [you] face first down against the
      ground. Snorting hungrily like a bull, [foe]~>look down at
      [your:adjective:butt] before brutally ramming
      [all of:their:adjective:penis] into [one of:your:adjective:anus].`
  }

  playerContinue() {
    return `
      [you] squeeze down on [all of:that:adjective:penis(foe)]~ that ceaselessly
      >keep pounding away at [your:adjective:butt].`
  }

  enemyContinue() {
    return `[foe]~>continue to ravage [your:adjective:butt].`
  }

  climax() {
    return `
      [foe]~>roar out loudly as [they]~>be close to orgasm. With both hands
      around your waist [they] furiously >ravage [your:adjective:butt]
      until [they] finally >explode into it. Thick bovine cum slathering your
      insides and dribbling out of [your:adjective:anus]. Overwhelmed with
      satisfaction, [foe]~>fall down on [their] back — pulling [you] down with
      [them(foe)], impaling you on [their:adjective:penis]. As the beast
      recovers from its ordeal, [you] slowly and carefully get up. Feeling
      [all of:that:adjective:penis(foe)] sliding out of your abused hole while
      beads of cum trickle down your thighs.`
  }
}

class Vaginal extends Position {
  constructor(player, enemy) {
    super(player, ["vagina"], enemy, ["penis"])
    this.name = "vaginal"
    this.infects = true
  }

  idle() {
    return `
      [one of:whose:penis(foe)] is throbbing deep inside [one of:your:vagina].`
  }

  playerStart() {
    return `
      [you] turn your back towards [foe], shaking [your:adjective:butt] a few
      times before bending over. On all fours and with [your:adjective:butt]
      pointing up, [you] look back at [foe] from between your legs. Without any
      hesitation, [foe]~>grab you by [your:adjective:hips] and >ram
      [one of:their:adjective:penis] into [one of:your:adjective:vagina].`
  }

  enemyStart() {
    // todo
    return `
      [whose(foe)] mighty hands grab [you] by the waist as [they(foe)]~>force
      you to turn around and bend over. Grunting as [they]~>look down at
      [your:adjective:vagina] and then >ram [one of:their:adjective:penis] into
      [one of:them(your.vagina)].`
  }

  playerContinue() {
    return `your inner walls squeeze down tight on that monstrous cock.`
  }

  enemyContinue() {
    return `[foe]~>pound vigorously at [one of:your:adjective:vagina].`
  }

  climax() {
    return `
      [foe]~>pick up the pace, [one of:their:adjective:penis] sliding in and out
      of [one of:your:vagina]. [you] greedily squeeze down on it, moaning with
      pleasure. It doesn't take long for the monster to roar out and unload into
      [one of:your:vagina]. Hot bovine spunk building up inside of you and
      finally spurting out under its own pressure — dripping down your inner
      thighs. Snorting one last time and filled with satisfaction — [foe]~>fall
      asleep, pinning [you] under [their(foe)] weight. With some effort [you]
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

  idle() {
    return `[one of:whose:penis(foe)] is throbbing deep down your throat.`
  }

  playerStart() {
    return `
      [you] get down on your knees in front of [foe]. Facing
      [their:adjective:type:penis], you grab [them] with [your:hands] and jerk
      [them(foe.penis)] a few times. Licking your lips hungrily, you open
      [one of:your:mouth] and swallow [one of:them(foe.penis)] whole.`
  }

  enemyStart() {
    return `
      [foe]~>place [their] hand behind the back of [one of:your:head] and >shove
      it straight against [their(foe)] groin but you resist with your mouth
      closed. [foe]~>smirk and >pinch your nose shut and as soon as you open
      your mouth to breathe, [they(foe)]~>shove [one of:their:adjective:penis]
      through your lips. The thick bovine shaft drilling into
      [one of:your:mouth] and forcing itself down your throat.`
  }

  playerContinue() {
    return `
      [you] continue to bob your head back and forth as
      [one of:that:adjective:type:penis(foe)] fills your throat.`
  }

  enemyContinue() {
    return `
      [foe]~>keep fucking your face. [their] hand on the back of your head,
      preventing you from escaping.`
  }

  climax() {
    return `
      [foe]~>place [their] hand against the back of your head, then >thrust
      vigorously — [one of:their:adjective:penis] sliding all the way down your
      throat, making it bulge visibly. [they(foe)]~>keep pounding away at your
      face, tears rolling down your cheeks. [you] almost faint, but luckily the
      brute reaches [their] orgasm first. Thick salty cum filling your insides —
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

  idle() {
    return `
      you have got [all of:your:adjective:breasts] squeezed tightly around
      [whose:penis(foe)].`
  }

  playerStart() {
    return `
      [you] get down on your knees in front of [foe]. Cupping
      [two of:your:adjective:breasts] and kneading them playfully. [foe]~>take
      you up on the offer and >jam [all of:their:adjective:penis] in between
      [them(your.breasts)].`
  }

  enemyStart() {
    return `
      [foe]~>overpower [you] and >pin you to the floor under [their(foe)]
      weight. [they]~>sit down on top of [you] with [their:adjective:penis]
      throbbing between [all of:your:breasts].`
  }

  playerContinue() {
    return `
      [you] squeeze [two of:your:adjective:breasts] together around
      [whose:penis(foe)].`
  }

  enemyContinue() {
    return `[foe]~>continue to fuck your cleavage.`
  }

  climax() {
    return `
      [foe]~>groan and >growl with [their:adjective:penis] throbbing between
      [your:adjective:breasts]. [they(foe)]~>fuck your cleavage over and over
      like a wild beast. [you] even start to feel sore but you can't help but
      moan out with joy — triggering [whose(foe)] climax. Thick bovine spunk
      spraying all over [your:face].`
  }
}

export default class MinotaurEncounter extends DefaultEncounter {
  constructor(game) {
    super(game, new Minotaur(game))

    this.addPosition(Anal)
    this.addPosition(Vaginal)
    this.addPosition(Blowjob)
    this.addPosition(Boobjob)
    //TODO - handjob
    //TODO - footjob
  }

  introMessage() {
    return `
      Suddenly a massive axe swings right above [your:head(your)] and cuts
      through the flora. You are ambushed by a **[title(foe)]**!`
  }

  mainMessage() {
    return `[you] are facing a **[title(foe)]**.`
  }

  describeEnemyMessage() {
    let text = `
      You have read about these in books. A creature with the head of a bull and
      the body of a man.`

    if (this.player.body.size < 190) {
      text += `
        Towering over [you], [they(foe)] must be at least 7 feet tall.`
    } else {
      text += `
        You estimate [them(foe)] to be at least 7 feet tall.`
    }

    text += `
      Brandishing an oversized axe and wearing no clothing or jewellery. The
      tales failed to mention a considerable detail — [their:adjective:penis],
      throbbing and filling the air with potent musk!`

    return text
  }

  playerAttackedMessage() {
    return `[foe]~>swing [their] massive axe at [you].`
  }

  combatLossMessage() {
    return `
      [foe]~>roar victoriously, swinging [their] axe in the air a few times
      before walking away. Leaving your —almost lifeless— body behind.`
  }

  combatVictoryMessage() {
    return `[foe]~>succumb to [their] wounds.`
  }

  climaxLossMessage() {
    return `
      Satisfied from the fucking, [foe]~>leave [their] bitch —[you]— behind as
      [they(foe)]~>shuffle back into the wilderness.`
  }

  climaxVictoryMessage() {
    return `
      [you] sneak off as [foe]~>have become docile from [their] recent orgasm.`
  }

  seducedMessage() {
    return `
      [foe]~>stroke [one of:their:adjective:type:penis] — Pre-cum dribbling down
      from its tip and filling the air with overpowering musk.`
  }

  // TODO add gradations of disinterest ?
  notInterestedMessage() {
    return `
      [foe]~>slap [you] in the face as you try to approach [them(foe)] — clearly
      not impressed by what you're offering.`
  }

  grappleFailureMessage() {
    return `
      [foe]~>be horny as fuck and >try to pin [you] down, but you manage to
      dodge [their(foe)] assault.`
  }

  infectionMessage() {
    return `**[whose(foe)] spunk corrupts your body…**`
  }

  struggleSuccessMessage() {
    return `[you] manage to wriggle out of [whose(foe)] grasp.`
  }

  struggleFailureMessage() {
    return `
      [you] attempt to struggle free but [foe]~>keep you firmly pinned down.`
  }

  pullOutMessage() {
    return `
      [foe]~>be about to climax — pull out at the last moment?`
  }

  climaxMessage() {
    return `
      [foe]~>roar out with both hands around [their:penis], jerking [themself]
      off until [they]~>explode into an overwhelming orgasm. Cum spurting all
      over the place with a few drops managing to land on [your:face]. Half
      unconscious [foe]~>fall down to the ground.`
  }
}
