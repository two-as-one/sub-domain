## Transformations

A transformation represents a distinct change that can be made to the player's body. For instance, _grow a new penis if they have none_ or _increase penis size if they have one_.

### Transformation

To make a new transformation, create a new class that extends from `_super` and add it to this folder.
The file name doesn't matter, it's the `name` property of the transformation that is used as its unique key.

#### 1. extend `name`

This is both the descriptive name of the transformation and the unique key that is used to reference it in other files.

#### 2. extend `available`

This should return true if the transformation can be applied. This is used to determine which transformations are available to the player.

#### 3. extend `apply`

This is the method that actually applies the transformation. It should make the necessary changes to the player, then return a template message describing what happened (this will be show to the user)

### Transformation bundles

Transformations can be grouped together to create a reusable bundle. This allows multiple sources to have the same list of possible transformations. For an example, have a look at `minotaur-cum.js`.

### TransformationManager

The player has a `TransformationManager` that allows them to be easily transformed.

```js
player.transform.pickOne(["increase penis size", "grow a new penis"]);
```

This will pick one of the transformations at random (filtering out unavailable transformations) and then apply it to the user, returning a string describing what happened.
