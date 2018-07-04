# Grammar

## `Grammar.verb(who, verb)`
Conjugates a verb based on pronoun. Allows verbs to be conjugated dynamically based on gender of an entity.

```js
let enemy = new Minotaur(...)

enemy.gender = "female"
Grammar.verb(enemy.they, "be") // -> "she is"

enemy.gender = "male"
Grammar.verb(enemy.they, "be") // -> "he is"

enemy.gender = "neutral"
Grammar.verb(enemy.they, "be") // -> "they are"

enemy.gender = "none"
Grammar.verb(enemy.they, "be") // -> "it is"

Grammar.verb(enemy.who, 'swing') // -> "the minotaur swings"

```

## `Grammar.clean(text)` [automatic]
This function is called automatically whenever text gets displayed on the screen. It allows dynamic text to be written more seamlessly without having to care about grammatical details.

##### Trim blanks spaces
```js
"hello     world" // -> "hello world"
```

##### Capitalize sentences
```js
"hello world." // -> "Hello world."

const word = "hello"
`${word} world.` // -> "Hello world."
```

##### Contract common words
Certain word combinations will be contracted.
```js
"you have" // -> "you've"
"she is" // -> "she's"
"do not" // -> "don't"
```

Automatic contraction can be prevented with `/`.
```js
"I/have" // -> "I have"
"and/or" //-> "and/or" - does not contract, / preserved
```

##### Markdown
All text will be parsed as (markdown)[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet].

```js
`paragraph *one*

paragraph **two**` // -> "<p>paragraph <em>one</em></p><p>paragraph <strong>two</strong></p>"
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