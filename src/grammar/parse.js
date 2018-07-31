import Grammar from "./grammar"
import game from "../game"

// finds a target
function find(target) {
  // custom targets
  switch (target) {
    case "you":
    case "your":
      return game.player
    case "foe":
      return find("enemy")
  }

  //default targets
  return game.scene[target]
}

// find the subject of a snippet
// example: [foe] => "the minotaur"
//          [foe.their] => "its"
//          [your.penis.two] => "both of your penises"
// subject is remembered between calls
// example: [you] stroke [penis] => "You stroke your penis"
function getSubject(snip, subject) {
  // split snippet
  const arr = snip.split(".")

  // grab target
  let target = arr.shift()

  if (subject && subject[target]) {
    // use last known subject
    target = subject[target]
  } else if (typeof find(target) !== "undefined") {
    // find target
    target = find(target)
  } else {
    // don't interpret snippet
    target = snip
  }

  // dig through properties
  while (arr.length && typeof target !== "string") {
    // remember subject
    subject = target

    target = target[arr.shift()]
  }

  // if the target is still an object, use it's `who` property
  if (typeof target === "object") {
    // remember subject
    subject = target

    target = target.who
  }

  return [target, subject]
}

// template condition: [condition?foo|bar]
// conditions can be nested: [cond?foo|if?bar|baz]
// each part of the condition can be a dynamic subject: `[you.isHungry?your.penis|your.breasts]`
// all conditions are resolved on
function condition(snip, subject) {
  const [cond, then] = snip.split(/\?(.+)/)

  if (then) {
    const [a, b] = then.split(/\|(.+)/)
    let result = null
    ;[result, subject] = getSubject(cond, subject)
    return result ? condition(a, subject) : condition(b, subject)
  } else {
    return getSubject(snip, subject)
  }
}

export function parse(text = "") {
  let subject

  // parse selectors and conditions
  let out = text.replace(
    /(\[)([^\]]*)(\])/g,
    (match, openBracket, snip, closeBracket) => {
      // ignore [a] and [an]
      // these are special parsers
      if (snip === "a" || snip === "[an]") {
        return match
      }

      try {
        let out = null
        ;[out, subject] = condition(snip, subject)

        return out
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`parser error`, e, text)
        return match
      }
    }
  )

  // articlize
  out = out.replace(/\[(a|an)\] (\w+)/g, (match, article, word) =>
    Grammar.articlize(word)
  )

  return out
}
