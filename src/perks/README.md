## Perks

Perks are bonus abilities that the player can gain by leveling up.

### Perk

To make a new perk, create a new class that extends from `_super` and add it to this folder.
The file name doesn't matter, it's the `name` property of the perk that is used as its unique key.

#### 1. extend `name`
This is both the descriptive name of the perk and the unique key that is used to reference it in other files.

#### 2. extend `available`
This should return true if the perk is available for the player when they level up.

#### 3. extend `description`
This returns a 'flavor text' description of the perk

#### 3. extend `effect`
This returns a textual description of what the perk does. It should clearly describe what the player will gain by taking this perk while remaining vague on the numbers.

### PerkManager

The player has a `PerkManager` with some useful methods for managing player perks

```js
player.perks.has('masochist') //returns true or false
```

```js
player.perks.grant('masochist') //grants the masochist perk to the player
```

```js
player.perks.revoke('masochist') //takes the masochist perk away
```

```js
player.perks.exists('masochist') //returns true or false depending on whether a perk with this name exists
```

```js
player.perks.listAvailable // => an array of all the perks available to the player when leveling up
```

```js
player.perks.listGranted // => an array of all the perks the player has been granted
```