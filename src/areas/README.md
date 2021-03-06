## Areas

Areas are hub zones. From there, the player can; do whatever they would at their camp, explore the area, or travel to a different area.

### Area

To make your own area, create a new class that extends from `_super`. You can use the `forest` area as an example.
Make sure to `import` and `persist` your custom area

#### 1. extend `name` and `saveKey`

- `name` - used to identify the area

#### 2. extend `explore`

This function **must** return either a string or another scene.

- if a string is returned, it will be displayed, then the game will switch back to the `main` scene
- if a scene is returned, the game will switch to that scene. Generally this scene should be an encounter scene.

#### 3. extend `description`, `exploreMessage` and `sleepMessage`

- `introMessage` - the message shown when the player enters this area for the first time
- `exploreMessage` - the message shown when the player explores this area before determining what actually happens
- `dayDescription` - the description of the area during the day, this is displayed on the `main` scene
- `nightDescription` - the description of the area during at night, this is displayed on the `main` scene
- `campDescription` - describes the player's camp
- `sleepMessage` - the message shown when the player sleeps through the night
- `sunsetMessage` - the message shown when sun sets
- `sunriseMessage` - the message shown when sun rises
