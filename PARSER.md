# Sub domain parser
The parser allows you to write dynamic text without having to care about grammatical detail all while keeping things readable.

### Es6 template literals
All text can be written as es6 template literals. This is a double edged sword that should be used sparingly — Granting flexibility at the expense of readability.

### What gets parsed?
All text rendered on screen goes through the parser with the exception of `static` text (as the latter is used to render raw HTML).

### Line length: 80
To keep things readable, it is asked that you don't exceed the 80 character line limit when writing text. This guideline may be removed at a later date if `prettier` gets better at dealing with es6 template literals

### Reserved symbols
A limited set of symbols are reserved by the parser and caution is advised when using them. Usually these only serve as syntax when **directly attached to a word**, otherwise they can be used freely without concern. See blow for details on each of them
* `~`
* `>`
* `/`
* `%`
* `[` and `]` plus `.` `?` and `|`

## Parser syntax
In this section we will explain additional syntax that can be used when writing text.

### Selectors `[…]`
Selectors are the bread and butter of dynamic text.

#### Subject selector
The most basic form of selection, it allows you to target game entities in your text.
Depending on which scene you are currently in, you may have access to different subjects.

##### Examples
In the example below we assume a combat encounter with a minotaur.
* `[foe]` => `the minotaur`
* `[foe.they]` => `it`
* `[foe.them]` => `it`
* `[foe.their]` => `its`
* `[foe.theirs]` => `its`
* `[foe.themself]` => `itself`
* `[you]` => `you`
* `[your.breasts]` => `your breasts`
* `[your.breasts.one]` => `one of your breasts`

If whatever you are targeting does not exist, it will be interpreted as raw text.
* `[hello.world]` => `hello.world`
* `[one two three.]` => `one two three.`

#### `[you]`
Most of the time, this will just print _you_, but if the player has two heads, this will output one of the following: _you_, _both of you_, _you both_. In cases where only _you_ would make sense, use `you` instead of `[you]`.

#### `[you]` & `[your]`
`[you]` and `[your]` both target the player and can be used interchangeably. Use whichever makes the most sense when reading the text.

### Selector memory
The subject selector has internal memory. This allows it to remember the last thing it referred to.

##### Examples
* `[you] grab [breasts]` => `you grab both of your breasts`
* `[you] grab [penis], [they]~>throb` => `you grab your penis, it throbs`

if your sentence flips between two subjects, you will need to re-target it each time.

* `[foe]~>grab [you], [foe.they]~>be too strong for you` => `the minotaur grabs you, it's too strong for you`

#### Conditionals `[…?…|…]`
Conditional selectors allow you to output one of two options.

##### Examples
* `you are [you.isHungry?super hungry|totally fine]` => `you're super hungry` or `you're totally fine`
* `you grab [your.udder.has?your.udder|your.penis]` => `you grab your udder` or `you grab your penis`


#### available subjects
Here's a non-exhaustive list of subjects that can be targeted. Not all subjects will be available at all times, for instance `[foe]` may only be available during combat scenes.
This list does not include everything as each scene can have its own conditions and subjects.

##### player
* `[you]`

##### body parts
* `[your.anus]`
* `[your.balls]`
* `[your.body]`
* `[your.breasts]`
* `[your.face]`
* `[your.feet]`
* `[your.hands]`
* `[your.head]`
* `[your.mouth]`
* `[your.nipples]`
* `[your.penis]`
* `[your.tail]`
* `[your.udder]`
* `[your.vagina]`

Each body part has access to further sub-selectors
* `[your.breasts.all]`
* `[your.breasts.one]`
* `[your.breasts.two]`
* `[your.breasts.three]`
* `[your.breasts.four]`
* `[your.breasts.adjective]`
* `[your.breasts.number]`
* `[your.breasts.singular]`
* `[your.breasts.plural]`
* `[your.breasts.pluralized]`
* `[your.breasts.they]`
* `[your.breasts.them]`
* `[your.breasts.their]`
* `[your.breasts.theirs]`
* `[your.breasts.themself]`

##### enemy
* `[foe]`

The following selectors all return the appropriate pronoun based on gender
* `[foe.they]`
* `[foe.them]`
* `[foe.their]`
* `[foe.theirs]`
* `[foe.themself]`

### verb conjugation `~` & `>`
Verbs can automatically be conjugated (to the present tense) according to a subject. To do this you need to use the `~` and `>` symbols.

`~` attached directly **at the end** of a word, indicates that this will be the subject of all future verbs.

`>` attached directly **at the start** of a verb, indicates that this verb must be conjugated. Verbs must be written in infinitive form.

Any number of words can be added between the two symbols. A single subject (`~`) can be used for multiple verbs (`>`)

When conjugation a simple `subject verb` sentence, `~>` can be used without spaces.

##### examples
* `[foe]~>grab [you]` => `the minotaur grabs you`
* `[foe]~>grab and >slap [you]` => `the minotaur grabs and slaps you`
* `[foe]~ greedily >grab [you]` => `the minotaur greedily grabs you`

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

Note that the `/` only gets removed if the two words would contract normally, in the example below the two words don't contract so the entire construct is left as is.
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