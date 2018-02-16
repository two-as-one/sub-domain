## Encounters

Encounters are the _combat_ of this game, they describe an encounter between the player and another creature. These don't necessarily have to be combat-only, you might for instance want to build a _friendly_ encounter where the player only has the `seduce` and `submit` options.

### Encounter

To make your own encounter, create a new class that extends from `_super`. Use the `minotaur` encounter as an example.

#### 1. extend the constructor to call `super` with a new entity
```js
constructor (game) {
  super(game, new Minotaur());
}
```

#### 2. Make sure there's at least 1 position defined.
Give it any `name`, this will be visible when the player chooses how to submit. Define which of the following parts `player` and `enemy` are using — these parts will determine whether the position is available. Also set whether this particular position can infect the player.
```js
get positions () {
  return [
    {name: 'missionary', player: 'vagina', enemy: 'penis', infects: true}
  ];
}
```

The `name` of each position will be passed on to `playerInitiatePosition`, `enemyInitiatePosition`, `playerContinuePosition`, `enemyContinuePosition`, `orgasmVictoryMessage` and `orgasmLossMessage` so that the appropriate messages can be generated. This means that each of these functions **must** be able to generate a message for each position you define.

#### 3. Extend all of the following with specific messages:
`introMessage` `describeEnemyMessage` `mainMessage` `playerAttackdeMessage` `combatLossMessage` `combatVictoryMessage` `seducedMessage` `notInterestedMessage` `grappleFailureMessage` `playerInitiatePositionMessage` `enemyInitiatePositionMessage` `playerContinuePositionMessage` `enemyContinuePositionMessage` `struggleSuccessMessage` `struggleFailureMessage` `orgasmVictoryMessage` `orgasmLossMessage`