## Entities

Entities are creatures or people that the player can encounter along their journey. These will generally be used inside of an `Encounter`.

### Entity
To make your own entity, create a new class that extends from `_super`. Use the `minotaur` encounter as an example.

#### 1. extend `likes`
This should return a number from `0` to `1` that determines how much this creature likes that type of part.
This value plays a role in determining how much this create likes certain sexual position and how much lust they gain from seduction.
Ideally this should never return a value below `0.25` — this is to give the player a chance.

#### 2. extend `has`
This function should return `true` or `false` for each type of part, allowing the game to know which parts this creature has.
