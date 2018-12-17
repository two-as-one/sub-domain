/**
 * This file is a commonJs module so that `game` is available as a global variable instead of on `game.default`
 */
var game = require("game").default
var scene = "start"

var sceneRegexp = /[?&]scene=([^&]*)/
if (window.location.search.match(sceneRegexp)) {
  scene = window.location.search.match(sceneRegexp)[1]
}

try {
  game.setScene(scene)
} catch (e) {
  game.setScene("start")
}

game.VERSION = VERSION

module.exports = game

window.onerror = function(messageOrEvent, source, lineno, colno, error) {
  document.body.innerHTML =
    `
    <p>Uh oh, it looks like something broke!</p>
    <p>Try reloading the page…</p>
  ` + error.stack
  document.body.classList.add("error")
}
