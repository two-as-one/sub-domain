/**
 * This file is a commonJs module so that `game` is available as a global variable instead of on `game.default`
 */
var Game = require("game").default
module.exports = new Game()
module.exports.switchState("start")
module.exports.VERSION = VERSION

window.onerror = function(messageOrEvent, source, lineno, colno, error) {
  document.body.innerHTML =
    `
    <p>Uh oh, it looks like something broke!</p>
    <p>Try reloading the page…</p>
  ` + error.stack
  document.body.classList.add("error")
}
