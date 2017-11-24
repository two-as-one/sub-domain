## Areas

Areas are hub zones. From there, the player can; do whatever they would at their camp, explore the area, or travel to a different area.

### Area

To make your own area, create a new class that extends from `_super`. You can use the `forest` area as an example.
`Area` extends from `Saveable` — any data that should persist through saving must be stored on `this.stats`

#### 1. extend `name` and `saveKey`
  - `name` - used to identify the area
  - `saveKey` - used to store progress of area, make sure this does not collide with any other save keys

#### 2. extend `explore`
This function **must** return either a string or another state.
  - if a string is returned, it will be displayed, then the game will switch back to the `main` state
  - if a state is returned, the game will switch to that state. Generally this state should be an encounter state.

#### 3. extend `description`, `exploreMessage` and `sleepMessage`
  - `exploreMessage` - the message shown when the player explores this area before determining what actually happens
  - `dayDescription` - the description of the area during the day, this is displayed on the `main` state
  - `nightDescription` - the description of the area during at night, this is displayed on the `main` state
  - `sleepMessage` - the message shown when the player sleeps through the night
  - `sunsetMessage` - the message shown when sun sets
  - `sunriseMessage` - the message shown when sun rises