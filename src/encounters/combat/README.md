## Encounters

Encounters are the _combat_ of this game, they describe an encounter between the player and another creature. These don't necessarily have to be combat-only, you might for instance want to build a _friendly_ encounter where the player only has the `seduce` and `submit` options.

### Encounter

To make your own encounter, create a new class that extends from `_super`. Use the `minotaur` encounter as an example.

#### 1. extend the constructor and call `super` with a new entity
```js
constructor (game) {
  super(game, new Minotaur());
}
```

#### 2. add as many positions as you like, the more the better
1. First create a class that extends from `Position`
```js
class Anal extends from Position {
}
```
2. configure it via the constructor
```js
constructor () {
  super(player, ['anus'], enemy, ['penis'])
  this.name = 'anal'
  this.infects = true
}
```
3. extend `idle`, `playerStart`, `enemyStart`, `playerContinue`, `enemyContinue` and `climax`

4. then finally, add it to your encounter
```js
this.addPosition(Anal);
```

#### 3. Extend all of the following with specific messages:
  * `introMessage`
  * `mainMessage`
  * `describeEnemyMessage`
  * `playerAttackedMessage`
  * `combatLossMessage`
  * `combatVictoryMessage`
  * `climaxLossMessage`
  * `climaxVictoryMessage`
  * `seducedMessage`
  * `notInterestedMessage`
  * `grappleFailureMessage`
  * `infectionMessage`
  * `struggleSuccessMessage`
  * `struggleFailureMessage`
  * `pullOutMessage`
  * `climaxMessage`