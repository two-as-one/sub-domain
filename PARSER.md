# sub domain parser
The parser allows you to write dynamic text without having to care about grammatical detail all while keeping said text readable. Using a mixture of es6 template literals with additional syntactic sugar.

### what gets parsed?
Any text that is rendered on screen goes through the parser. This includes both regular text and player-selectable options. The only exception is `static` text, as this is used to display raw html.

### line length: 80
To keep things readable, it is asked that you don't exceed the 80 character line limit when writing text. This guideline may be removed at a later date if `prettier` gets better at dealing with es6 template literals

### reserved symbols
A limited set of symbols are reserved by the parser and caution is advised when using them. Usually these only serve as syntax when **directly attached to a word**, otherwise they can be used freely without concern. See blow for details on each of them
* `~`
* `>`
* `/`
* `%`

## parser syntax
In this section we will explain additional syntax that can be used when writing text.

### verb conjugation `~` & `>`
Verbs can automatically be conjugated (to the present tense) according to a subject. To do this you need to use the `~` and `>` symbols.

`~` attached directly **at the end** of a word, indicates that this will be the subject of all future verbs.

`>` attached directly **at the start** of a verb, indicates that this verb must be conjugated. Verbs must be written in infinitive form.

Any number of words can be added between the two symbols. A single subject (`~`) can be used for multiple verbs (`>`)

When conjugation a simple `subject verb` sentence, `~>` can be used without spaces.

##### examples
* `the minotaur~>grab you` => `the minotaur grabs you`
* `the minotaur~>grab and >slap you` => `the minotaur grabs and slaps you`
* `the minotaur~ greedily >grab you` => `the minotaur greedily grabs you`

### Chance to leave out words `%`
Certain words in a sentence can be given a percentage chance of appearing. To do this you need to use the `%` symbol. This only works for individual words.

Usually you'll want to use this for adverbs.

#### examples
* `your 40%large hands` => 60% `your large hands`, 40% `your hands`

### Contractions `/`
Certain word combinations get contracted automatically. This can be prevented by adding `/` between the two words (no spaces)


##### examples
* `You have` => `You've`
* `You/have` => `You have`
* `She is` => `She's`
* `She/is` => `she is`
* `do not` => `don't`
* `do/not` => `do not`

Note that the `/` only gets removed if the two words would contract normally:
* `he/she` => `he/she`

### Markdown
All text gets parsed as [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

This allows you to easily `*`*emphasize*`*` or `**`**bold**`**` text and insert paragraphs using a double new line. See the [markdown docs](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for full capabilities.

Additionally, the parser will also understand quoted text using `"` , even though this isn't basic markdown syntax.

##### examples
```js
`paragraph *one*

paragraph "two"

paragraph **three**`
```
=> `<p>paragraph <em>one</em></p><p>paragraph <q>two</q></p><p>paragraph <strong>three</strong></p>`

## parser cleanup
The parser automatically cleans up messy text. In this section we'll explain the things it fixes for you.

### Trim text
Trailing blank spaces are removed. Double spaces are collapsed to single spaces. Empty paragraphs are removed.

### Capitalize
Capitalizes the first word of each sentence

### undefined
Any instances of the word `undefined` are removed. This allows you to be more lenient when writing template literals as any `undefined` values will be ignored instead of being output as `undefined`

## Object grammar
Classes can be given a set of grammatical utilities using `Grammar.mix(Class)`. This will give any instanced object a set of properties that can be used in es6 template literals.

```js
let e = new Minotaur(...)

e.gender = "none" //default for minotaur
e.who // -> "the minotaur"
e.whose // -> "the minotaur's"
e.they // -> "it"
e.them // -> "it"
e.their // -> "its"
e.theirs // -> "its"
e.themself // -> "itself"

e.gender = "female"
e.they // -> "she"
e.them // -> "her"
e.their // -> "her"
e.theirs // -> "hers"
e.themself // -> "herself"

e.gender = "male"
e.they // -> "he"
e.them // -> "him"
e.their // -> "his"
e.theirs // -> "his"
e.themself // -> "himself"

e.gender = "neutral"
e.they // -> "they"
e.them // -> "them"
e.their // -> "their"
e.theirs // -> "theirs"
e.themself // -> "themself"
```

### examples
```js
let e = new Minotaur(...)

`${e.who}~>attack you. ${e.they} dealt 10 damage`;
// -> "The minotaur attacks you. It dealt 10 damage"
```