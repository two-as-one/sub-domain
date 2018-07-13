const MAP = {
  you: game => game.player,
  your: game => game.player,
  foe: game => game.currentState.enemy
}

export function parse(text = "") {
  const game = require("../index")
  let subject

  return text.replace(
    /(\[)([^\]]*)(\])/g,
    (match, openBracket, snip, closeBracket) => {
      try {
        // split snippet
        snip = snip.split(".")

        // grab target
        let target = snip.shift()

        if (MAP[target]) {
          // map target to game object
          target = MAP[target](game)
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

        if (typeof target !== "string") {
          // remember subject
          subject = target

          target = target.who
        }

        return target
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`parser error`, e, text)
        return match
      }
    }
  )
}
