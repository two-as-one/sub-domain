## Parts

Parts represent parts of the player's body. These can be very specific (`penis`, `hands`, `mouth`) or more overall characteristics (`skin`, `build`). Parts provide multiple ways of describing themselves so that they can be used in templates. Parts can also be transformed via `grow`, `shrink`, `add`, `remove`

### Part

To make a player part, create a new class that extends from `_super`.

#### 1. extend `saveKey`
This is needed for the part to be able to be saved, make sure this does not collide with any other `saveKey` across the code base.

#### 2. extend `defaults`
This is the default config the part will have when a new game is started.

#### 3. extend `singular`
This should return the singular of the name of the part, you can use `Part.random()` to define multiple names.

#### 4. extend `plural`
This should return the plural of the name of the part, you can use `Part.random()` to define multiple names.

#### 5. extend `adjective`
You should return an adjective for the part, you can use any logic to define which adjectives can be returned based on part size, quantity, etc...

#### 6. extend `description`
This is the description that will be shown when the player examines themselves. It should return a `falsey` value if the player doesn't have that part or if the part doesn't warrant a description.
Avoid starting the descriptions with `You have...` as this makes the player description less interesting to read.

#### 7. add the part to `player/player.js`
Make sure the part is added to the player's `constructor`