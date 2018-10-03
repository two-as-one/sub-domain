# Grammar

All text displayed on the screen goes through the grammar cleaner (except for static text)
This allows you to write text more seamlessly without having to worry about the grammatical details.
Below is a description of all the things it will do for you.

## `Grammar.clean(text)` [automatic]

This function is called automatically whenever text gets displayed on the screen.

##### Conjugate verbs

Verbs can automatically be conjugated by using `~` and `>` to mark subject and verb respectively.
`~` must be attached directly at the end of the subject. `>` must be attached directly at the start of the verb. `~>` can be used when there are no other words between the verb an the subject.
You _must use the singular_ version of the verb for this to work correctly

```js
"he~>walk"; // -> "he walks"
"they~>walk"; // -> "they walk"
"the minotaur~ viscously >slam"; // -> "the minotaur viscously slams"
"the minotaurs~ viscously >slam"; // -> "the minotaurs viscously slam"
```

##### Chance to leave out words

Certain words can be marked as optional to be included only a percentage of time.

```js
"your 60%big pen"; // -> 60% chance "your big pen"
// -> 40% chance "your pen"
```

##### Removes `undefined`

Gets rid of the word `undefined`, this allows string literals to be a bit faster and looser when it comes to using undefined values

```js
"undefined"; // -> ""
```

##### Trim blanks spaces

```js
"hello     world"; // -> "hello world"
```

##### Capitalize sentences

```js
"hello world."; // -> "Hello world."

const word = "hello"`${word} world.`; // -> "Hello world."
```

##### Contract common words

Certain word combinations will be contracted.

```js
"you have"; // -> "you've"
"she is"; // -> "she's"
"do not"; // -> "don't"
```

Automatic contraction can be prevented by inserting a `/` between the two words (no spaces).
If the two words would not contract, then the `/` is preserved

```js
"I/have"; // -> "I have"
"and/or"; //-> "and/or" - does not contract, / preserved
```

##### Markdown

All text will be parsed as (markdown)[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet].

```js
`paragraph *one*

paragraph **two**`; // -> "<p>paragraph <em>one</em></p><p>paragraph <strong>two</strong></p>"
```

## Entities

Entities have a personalized version of `Grammar` that allows for correct pronoun use.

```js
let entity = new Minotaur(...)

entity.gender = "none" //default for minotaur
entity.who // -> "the minotaur"
entity.whose // -> "the minotaur's"
entity.they // -> "it"
entity.them // -> "it"
entity.their // -> "its"
entity.theirs // -> "its"
entity.themself // -> "itself"

entity.gender = "female"
entity.they // -> "she"
entity.them // -> "her"
entity.their // -> "her"
entity.theirs // -> "hers"
entity.themself // -> "herself"

entity.gender = "male"
entity.they // -> "he"
entity.them // -> "him"
entity.their // -> "his"
entity.theirs // -> "his"
entity.themself // -> "himself"

entity.gender = "neutral"
entity.they // -> "they"
entity.them // -> "them"
entity.their // -> "their"
entity.theirs // -> "theirs"
entity.themself // -> "themself"
```

## Player

The player is considered an Entity for grammatical purposes, so they have access to all the properties described above.

Additionally, the player also has access to `player.you`. Most of the time this will just display `you`, but if the player has the `conjoined` perk, it will vary between `you`, `both of you` and `you both`

```js
player.you; // -> "you"
player.perks.grant("conjoined");
player.you; // -> "you", "you both" or "both of you"
```

## Parts

Parts are considered Entities for grammatical purposes, so they have access to all the properties described above. Additionally, they also have access to the following extra properties.
TODO - describe part properties
