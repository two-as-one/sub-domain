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

function getSubject(snip, subject) {
  // split snippet
  snip = snip.split(".")

  // grab target
  let target = snip.shift()

  if (typeof find(target) !== "undefined") {
    // find target
    target = find(target)
  } else {
    // or use last known subject
    target = subject[target]
  }

  // dig through properties
  while (snip.length && typeof target !== "string") {
    // remember subject
    subject = target

    target = target[snip.shift()]
  }

  if (typeof target === "object") {
    // remember subject
    subject = target

    target = target.who
  }

  return [target, subject]
}

// template condition: [condition?foo|bar]
// conditions can be nested: [cond?foo|if?bar|baz]
// all conditions are resolved on
function condition(snip, subject) {
  const [cond, then] = snip.split(/\?(.+)/)

  if (then) {
    const [a, b] = then.split(/\|(.+)/)
    return getSubject(cond, subject)[0]
      ? condition(a, subject)
      : condition(b, subject)
  } else {
    return getSubject(snip, subject)
  }
}

export function parse(text = "") {
  let subject
  return text.replace(
    /(\[)([^\]]*)(\])/g,
    (match, openBracket, snip, closeBracket) => {
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
}
