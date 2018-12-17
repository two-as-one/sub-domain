/* global describe, it */

import assert from "assert"
import game from "game"
import Grammar from "./grammar"
import CUSTOM_TESTS from "./parser.tests.yaml"
import { DEBUG } from "globals/debug"

DEBUG.PARSER_SEED = "test"

function configure(config) {
  if (!config) {
    return
  }

  Object.entries(config).forEach(pair => {
    game[pair[0]].configure(pair[1])
  })
}

describe("Parser", () => {
  // categorise tests
  const categorised = {}
  CUSTOM_TESTS.forEach(snip => {
    const category = (snip.category || "other").trim()

    if (!categorised[category]) {
      categorised[category] = []
    }

    categorised[category].push(snip)
  })

  Object.entries(categorised).forEach(pair => {
    const category = pair[0]
    const snippets = pair[1]

    describe(category, () => {
      // group tests with the same title
      const groups = {}
      snippets.forEach(snip => {
        const title = (snip.title || "").trim()

        if (!groups[title]) {
          groups[title] = []
        }

        groups[title].push(snip)
      })

      Object.entries(groups).forEach(pair => {
        const title = pair[0]
        const tests = pair[1]

        describe(title, () => {
          tests.forEach(snippet => {
            const snip = snippet.snip.trim()
            describe(snip, () => {
              snippet.tests.forEach(test => {
                const expected = test.expected.trim()

                it(expected, () => {
                  configure(test.config)

                  assert.equal(Grammar.clean(snip, false), expected)
                })
              })
            })
          })
        })
      })
    })
  })
})
