/* global describe, it */

import assert from "assert"
import Grammar from "./grammar"
import { lib } from "library/library"
import LIB_TESTS from "./parser.library-tests.yaml"
import CUSTOM_TESTS from "./parser.custom-tests.yaml"
import { seed } from "utils/chance"

describe("Parser", function() {
  describe("library keys", function() {
    for (const key in LIB_TESTS) {
      seed("test")
      const expected = LIB_TESTS[key].trim()
      const actual = Grammar.clean(lib(key), false, false)
      it(`${key}: ${expected}`, function() {
        assert.equal(actual, expected)
      })
    }
  })

  describe("custom tests", function() {
    CUSTOM_TESTS.forEach(pair => {
      seed("test")
      const expected = pair.out.trim()
      const actual = Grammar.clean(pair.in.trim(), false, false)
      it(`${pair.in.trim()} => ${expected}`, () => {
        assert.equal(actual, expected)
      })
    })
  })
})
