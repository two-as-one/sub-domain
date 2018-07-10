import DefaultEncounter from "./_super"
import G from "grammar/grammar"
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
      ${G.verb(e.who, "have")} ${e.their} cock lodged deep inside
      ${p.anus.one}.`
  }

  playerStart(p, e) {
    return `
      ${p.you} turn your back towards ${e.who}, shaking your ass a few times
      before bending over. On all fours and with your ass pointing up,
      ${p.you} look back over your shoulders at ${e.who}.
      ${G.verb(e.they, "snort")}, unable to resist and with one hand on
      ${e.their} cock and the other on your ass ${e.they} brutally
      ${G.verb(e.they, "ram", false)} ${e.their} bovine cock deep into
      ${p.anus.one}.`
  }

  enemyStart(p, e) {
    return `
      ${G.verb(e.who, "grab")} you by your wrist then
      ${G.verb(e.who, "pin", false)} ${p.you} face first down against the
      ground. Snorting hungrily like a bull, ${G.verb(e.they, "look")} down at
      your ass before brutally ramming ${e.their} cock into ${p.anus.one}.`
  }

  playerContinue(p, e) {
    return `
      ${p.you} squeeze down on that monstrous cock that ceaselessly keeps
      pounding away at your ass.`
  }

  enemyContinue(p, e) {
    return `${G.verb(e.who, "continue")} to ravage your ass.`
  }

  climax(p, e) {
    return `
      ${G.verb(e.who, "roar")} out loudly as ${G.verb(e.they, "be")} close to
      orgasm. With both hands around your waist ${e.they} furiously
      ${G.verb(e.they, "ravage", false)} your ass until ${e.they} finally
      ${G.verb(e.they, "explode", false)} into it. Thick bovine cum slathering
      your insides and dribbling out of ${p.anus.all}. Overwhelmed with
      satisfaction, ${G.verb(e.who, "fall")} down on ${e.their} back — pulling
      ${p.who} down with ${e.them}, impaling you on ${e.their} shaft. As the
      beast recovers from its ordeal, ${p.who} slowly and carefully get up.
      Feeling that massive cock sliding out of your abused hole while beads of
      cum trickle down your thighs.`
  }
}

class Vaginal extends Position {
  constructor(player, enemy) {
    super(player, ["vagina"], enemy, ["penis"])
    this.name = "vaginal"
    this.infects = true
  }

  idle(p, e) {
    return `${e.whose} cock is throbbing deep inside ${p.vagina.one}.`
  }

  playerStart(p, e) {
    return `
      ${p.you} turn your back towards ${e.who}, shaking your ass a few times
      before bending over. On all fours and with your ass pointing up, ${p.you}
      look back at ${e.who} from between your legs. Without any hesitation,
      ${G.verb(e.who, "grab")} you by your hips and
      ${G.verb(e.they, "ram", false)} ${e.their} monstrous cock into
      ${p.vagina.one}.`
  }

  enemyStart(p, e) {
    return `
      ${e.whose} mighty hands grab ${p.you} by the waist as
      ${G.verb(e.they, "force")} you to turn around and bend over. Grunting as
      ${G.verb(e.they, "look")} down at ${p.vagina.all} and then
      ${G.verb(e.they, "ram", false)} ${e.their} brutish cock into
      ${p.vagina.multiple ? "one of them" : "it"}.`
  }

  playerContinue(p, e) {
    return `your inner walls squeeze down tight on that monstrous cock.`
  }

  enemyContinue(p, e) {
    return `${G.verb(e.who, "pound")} vigorously at ${p.vagina.one}.`
  }

  climax(p, e) {
    return `
      ${G.verb(e.who, "pick")} up the pace, ${e.their} monstrous cock sliding
      in and out of ${p.vagina.one}. ${p.you} greedily squeeze down on it,
      moaning with pleasure. It doesn't take long for the monster to roar out
      and unload into ${p.vagina.one}. Hot bovine spunk building up inside of
      ${p.you} and finally spurting out under its own pressure — dripping down
      your inner thighs. Snorting one last time and filled with satisfaction —
      ${G.verb(e.who, "fall")} asleep, pinning ${p.you} under ${e.their} weight.
      With some effort ${p.you} manage to dislodge the cock while wriggling out
      from under the sleeping beast.`
  }
}

class Blowjob extends Position {
  constructor(player, enemy) {
    super(player, ["mouth"], enemy, ["penis"])
    this.name = "blowjob"
    this.infects = true
  }

  idle(p, e) {
    return `${e.whose} cock is throbbing deep down your throat.`
  }

  playerStart(p, e) {
    return `
      ${p.you} get down on your knees in front of ${e.who}. Facing ${e.their}
      massive bovine cock, you grab it with ${p.hands.all} and jerk it a few
      times. Licking your lips hungrily, you open ${p.mouth.one} and swallow it
      whole.`
  }

  enemyStart(p, e) {
    return `
      ${G.verb(e.who, "punch")} ${p.you} in the gut. As soon as ${p.mouth.one}
      opens to cry out in pain, ${G.verb(e.they, "shove")} ${e.their} massive
      cock through your lips. The thick bovine shaft drilling into
      ${p.mouth.one} and forcing itself down your throat.`
  }

  playerContinue(p, e) {
    return `
      ${p.you} continue to bob your head back and forth as that massive bovine
      cocks fills your throat.`
  }

  enemyContinue(p, e) {
    return `
      ${G.verb(e.who, "keep")} fucking your face. ${e.their} hand on the back of
      your head, preventing you from escaping.`
  }

  climax(p, e) {
    return `
      ${G.verb(e.who, "place")} ${e.their} hand against the back of your head,
      then ${G.verb(e.who, "thrust", false)} vigorously — ${e.their} thick shaft
      sliding all the way down your throat, making it bulge visibly.
      ${G.verb(e.they, "keep")} pounding away at your face, tears rolling down
      your cheeks. ${p.you} almost faint, but luckily the brute reaches
      ${e.their} orgasm first. Thick salty cum filling your insides — rushing
      down your throat and spurting through your nose. ${e.whose} grip weakening
      — you pull back quickly, feeling that monster cock sliding out of your
      throat before being able to gasp for air.`
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
      ${p.you} have got ${p.breasts.all} squeezed tightly around ${e.whose}
      cock.`
  }

  playerStart(p, e) {
    return `
      ${p.you} get down on your knees in front of ${e.who}. Cupping
      ${p.breasts.two} and kneading them playfully. ${G.verb(e.who, "take")} you
      up on the offer and ${G.verb(e.they, "jam", false)} ${e.their} throbbing
      cock in between ${p.breasts.all}.`
  }

  enemyStart(p, e) {
    return `
      ${G.verb(e.who, "overpower")} ${p.you} and ${G.verb(e.who, "pin", false)}
      you to the floor under ${e.their} weight. ${G.verb(e.they, "sit")} down on
      top of ${p.you} with ${e.their} cock throbbing between ${p.breasts.all}.`
  }

  playerContinue(p, e) {
    return `${p.you} squeeze ${p.breasts.two} together around ${e.whose} cock.`
  }

  enemyContinue(p, e) {
    return `${G.verb(e.who, "continue")} to fuck your cleavage.`
  }

  climax(p, e) {
    return `
      ${G.verb(e.who, "groan")} and ${G.verb(e.who, "growl", false)} with
      ${e.their} monstrous cock throbbing between ${p.breasts.all}.
      ${G.verb(e.they, "fuck")} your cleavage over and over like a wild beast.
      ${p.you} even start to feel sore but you can't help but moan out with joy
      — triggering ${e.whose} climax. Thick bovine spunk spraying all over
      ${p.face.all}.`
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
      Suddenly a massive axe swings right above ${p.head.all} and cuts through
      the flora. ${p.you} are ambushed by a **${e.title}**!`
  }

  mainMessage(p, e) {
    return `${p.you} are facing a **${e.title}**.`
  }

  describeEnemyMessage(p, e) {
    let text = `
      You have read about these in books. A creature with the head of a bull
      and the body of a man.`

    if (p.body.size < 190) {
      text += `
        Towering over ${p.you}, ${e.they} must be at least 7 feet tall.`
    } else {
      text += `
        You estimate ${e.them} to be at least 7 feet tall.`
    }

    text += `
      Brandishing an oversized axe and wearing no clothing or jewellery. The
      tales failed to mention a considerable detail — ${e.their} monstrous
      bovine cock, throbbing and filling the air with potent musk!`

    return text
  }

  playerAttackedMessage(p, e) {
    return `${G.verb(e.who, "swing")} ${e.their} massive axe at ${p.you}.`
  }

  combatLossMessage(p, e) {
    return `
      ${G.verb(e.who, "roar")} victoriously, swinging ${e.their} axe in the air
      a few times before walking away. Leaving your —almost lifeless— body
      behind.`
  }

  combatVictoryMessage(p, e) {
    return `${G.verb(e.who, "succumb")} to ${e.their} wounds.`
  }

  climaxLossMessage(p, e) {
    return `
      Satisfied from the fucking, ${G.verb(e.who, "leave")} ${e.their} bitch
      —${p.you}— behind as ${G.verb(e.they, "shuffle")} back into the
      wilderness.`
  }

  climaxVictoryMessage(p, e) {
    return `
      ${p.you} sneak off as ${G.verb(e.who, "have")} become docile from
      ${e.their} recent orgasm.`
  }

  seducedMessage(p, e) {
    return `
      ${G.verb(e.who, "stroke")} ${e.their} massive bovine cock — Pre-cum
      dribbling down from ${e.their} tip and filling the air with overpowering
      musk.`
  }

  // TODO add gradations of disinterest ?
  notInterestedMessage(p, e) {
    return `
      ${G.verb(e.who, "slap")} ${p.you} in the face as you try to approach
      ${e.them} — clearly not impressed by what you're offering.`
  }

  grappleFailureMessage(p, e) {
    return `
      ${G.verb(e.who, "be")} horny as fuck and ${G.verb(e.who, "try", false)}
      to pin ${p.you} down, but you manage to dodge ${e.their} assault.`
  }

  infectionMessage(p, e) {
    return `**${e.whose} spunk corrupts your body…**`
  }

  struggleSuccessMessage(p, e) {
    return `${p.you} manage to wriggle out of ${e.whose} grasp.`
  }

  struggleFailureMessage(p, e) {
    return `
      ${p.you} attempt to struggle free but ${G.verb(e.who, "keep")} you firmly
      pinned down.`
  }

  pullOutMessage(p, e) {
    return `
      ${G.verb(e.who, "be")} about to climax — pull out at the last moment?`
  }

  climaxMessage(p, e) {
    return `
      ${G.verb(e.who, "roar")} out with both hands around ${e.their} cock,
      jerking ${e.themself} off until ${G.verb(e.they, "explode")} into an
      overwhelming orgasm. Cum spurting all over the place with a few drops
      managing to land on ${p.face.all}. Half unconscious
      ${G.verb(e.who, "fall")} down to the ground.`
  }
}
