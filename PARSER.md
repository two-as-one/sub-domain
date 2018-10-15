# Sub domain parser

The parser allows you to write dynamic text without having to care about grammatical details all while keeping things readable.

#### Es6 template literals

All text can be written as es6 template literals. This is a double edged sword that should be used sparingly — Granting flexibility at the expense of readability.

#### What gets parsed?

All text rendered on screen goes through the parser with the exception of `static` text (as the latter is used to render raw HTML).

#### Line length: 80

To keep things readable, it is asked that you don't exceed the 80 character line limit when writing text.

#### Reserved symbols

A limited set of symbols are reserved by the parser and caution is advised when using them. Usually these only serve as syntax when **directly attached to a word**, otherwise they can be used freely without concern. See blow for details on each of them

- `/`
- `%`
- `~` and `>`
- `[` and `]`

# Parser syntax

In this section we will explain additional syntax that can be used when writing text.

1. [expressions](#expressions-)

   1. [`you` & `foe`](#you-foe)
   2. [part](#part)
   3. [`your` & `their`](#your-their)
   4. [`whose`](#whose)
   5. [`they`, `them`, `their`, `theirs` & `themself`](#they-them-their-theirs-themself)
   6. [`all of`, `each of` & `every one of`](#all-of-each-of-every-one-of)
   7. [`one of`, `two of`, `three of` & `four of`](#one-of-two-of-three-of-four-of)
   8. [`that` & `those`](#that-those)
   9. [`title`](#title)
   10. [`number`](#number)
   11. [`adjective`](#adjective)
   12. [`type`](#type)

2. [conditionals](#conditionals-condition)
3. [`[a]` and `[an]`](#a-and-an)
4. [`[item]`](#item) TODO
5. [`[damage]` and `[lust]`](#damage-and-lust) TODO
6. [`[xp]`](#xp) TODO
7. [verb conjugation](#verb-conjugation-)
8. [contractions](#contractions-)
9. [markdown](#markdown)
10. [cleanup](#cleanup)
    1. [trim text](#trim-text)
    2. [capitalize](#capitalize)
    3. [undefined](#undefined)

## expressions `[…]`

Expressions are the bread and butter of dynamic text.

#### Anatomy of an expression

- `[subject]`
- `[subject(target)]`
- `[modifier:subject]`
- `[modifier:modifier:subject(target)]`

Expressions can be escaped with `\` to have have it output as raw text.

- `\[STR]` => `[STR]`

#### Basic expression `[subject]`

These are the most basic expressions. It will output who or what the subject of the selector is.

- `[foe]` => `the minotaur`
- `[you]` => `you`

Use `.` to target body parts, though usually you'll want to use the `your:` modifier. More on this in [parts](#part) and [`your` & `their`](#your-their)

- `[your.penis]` => `cock`

#### Expression memory

Expressions have internal memory, this allows you to omit parts of an expression as long as the subject remains the same.

- `[foe] whacks [their] axe in your face` => `The minotaur whacks its axe in your face`

In this example, there is no need to elaborate `[their]`, as the parser will know it refers to `[foe]`.

#### Expression target `[…(target)]`

Sometimes an expression needs to be told what the subject is.

- `[whose(foe)]` => `The minotaur's`
- `[whose(yours)]` => `Yours`
- `[whose:penis(foe)]` => `The minotaur's pecker`
- `[whose:penis(yours)]` => `Your cock`

This can also be used to change the subject midway in a sentence. Using it this way makes the parser forget what the previous subject was and switches it to the specified target.

- `[foe] grabs [whose:penis(yours)]` => `The minotaur grabs your shaft`
- `[foe] grabs [whose:penis]` => `The minotaur grabs the minotaur's shaft`

#### Expression modifiers `[modifier:…]`

Modifiers are bits of text that change dynamically based on the subject. You can add as many modifiers as you want and you can even repeat the same modifier.

- `[all of:your:adjective:breasts]` => `both of your sensitive mammaries`

Some modifiers can also change the subject ([`your` & `their`](#your-their))

- `[your:breasts]` => `your tits`

#### Raw text

If a piece of text does not match any known modifiers, it will be left untouched.

- `[your:amazing:penis]` => `your amazing shaft` (amazing is not a known modifier)

## you & foe

Usually used as a subject, though it can also be used as a modifier. `you` refers to the player and `foe` to the other person or creature in the scene.

- `[you]` => `you`
- `[foe]` => `the minotaur`

Note: `[you]` has a special effect when the player has the `conjoined` perk, occasionally spitting out `both of you` or `you both`

## part

Usually used as a subject, use the name of the part to target it. This should usually be combined with `your:` or `their:` so that the parser knows whose body part we are talking about.

- `[your:penis]` => `your cock`

#### available parts

Any of the parts described in [all.js](src/parts/_all.js) are accessible via any of their synonyms. For instance:

- `[your:penis]`
- `[your:cock]`
- `[your:pussy]`
- `[your:vagina]`
- `[your:breasts]`

(you can use `foe` to target the opponent's parts)

## your & their

Changes the subject of the expression and outputs the correct determiner.

- `[your:penis]` => `your shaft`
- `[their:penis]` => `its shaft`

## whose

Outputs who the subject belongs to.

#### On its own

- `[whose(foe)]` => `The minotaur's`
- `[whose(yours)]` => `yours`

#### With a subject

- `[whose:penis(foe)]` => `The minotaur's shaft`
- `[whose:penis(yours)]` => `your shaft`

#### With a subject that belongs to someone

- `[whose(foe.penis)]` => `The minotaur's shaft's`
- `[whose(yours.penis)]` => `your shaft's`

## they, them, their, theirs & themself

Uses the appropriate pronoun for the subject. Changes based on gender (male, female, neutral, none) and person (first, second, third). Will be pluralized when relevant.

- `[foe] roars as [they] fight` => `The minotaur roars as it fights`
- `[you] hit [them(foe)]` => `you hit it`
- `[their:penis]` => `its cock`
- `that axe of [theirs(foe)]` => `that axe of its`
- `[foe] massages [themself]` => `the minotaur massages itself`

## all of, each of & every one of

Describes all of a thing, depending on how many of that thing exists. **You will want to use this modifier more often than not.** Even for body parts the player only has one of, because they can grow extra ones.

- Only 1 exists: `[all of:your:penis]` => `your cock` (no output)
- exactly 2 exist: `[all of:your:penis]` => `both of your peckers` (both of)
- more than 2 exist: `[all of:your:penis]` => `all of your shafts` (all of)

`all of`, `each of` and `every one of` can be used interchangeably and will only differ when the player has more than two of said body part.

## one of, two of, three of & four of

Used to describe a specific number of parts.

- `[one of:your:breasts]` => `one of your boobies`

If the specified number is higher or equal than the amount of parts, [`all of`](#all-of-each-of-every-one-of) will be used instead.

- `[two of:your:breasts]` => `both of your boobies`
- `[three of:your:breasts]` => `both of your boobies`

## that & those

Outputs _"that"_ or _"those"_ depending on whether the subject is plural or singular.

- `[that:penis(yours)]` => `that shaft`
- `[that:breasts(yours)]` => `those tits`

## title

Outputs the title of the target, notice the lack of _"the"_.

- `[title(foe)]` => `minotaur`
- `you are facing a [title(foe)]` => `you are facing a minotaur`

## number

Outputs a number reflecting the quantity of the subject.

- `there are [number(your.breasts)] of them.` => `there are two of them`
- `[your:number:breasts]` => `your two tits`

## adjective

Outputs an adjective relevant to the current subject. Each body part has its own list of adjectives that can vary based on size, quantity, perks, arousal, etc...

- `[your:adjective:penis]` => `your massive shaft`
- `[your:adjective:penis]` => `your monstrous shaft`
- `[your:adjective:penis]` => `your cute shaft`
- `[your:adjective:penis]` => `your useless shaft`

## type

Outputs the type of the part, only if it's relevant. (not human)

- human: `[your:type:penis]` => `your cock`
- equine: `[your:type:penis]` => `your equine cock`

## Conditionals `[condition?…|…]`

Conditional selectors allow you to output one of two options.

- `you are [you.isHungry?super hungry|totally fine]` => `you're super hungry` or `you're totally fine`
- `you grab [you.has.udder?your:udder|your:penis]` => `you grab your udder` or `you grab your penis`

You can invert a condition using `!` instead of `?`

- `you are [you.isHungry!totally fine|super hungry]` => `you're super hungry` or `you're totally fine`

## `[a]` and `[an]`

This standalone expression uses the correct article based on the next word

- `[a] elpehant` => `an elephant`
- `[an] elpehant` => `an elephant`

Mostly useful when the next word is dynamic

- `[a] [title(foe)]` => `a minotaur`

## verb conjugation `~` & `>`

Verbs can automatically be conjugated (to the present tense) according to a subject. To do this you need to use the `~` and `>` symbols.

`~` attached directly **at the end** of a word, indicates that this will be the subject of all future verbs.

`>` attached directly **at the start** of a verb, indicates that this verb must be conjugated. Verbs must be written in infinitive form.

Any number of words can be added between the two symbols. A single subject (`~`) can be used for multiple verbs (`>`)

When conjugating a simple `subject verb` sentence, `~>` can be used without spaces.

- `[foe]~>grab [you]` => `the minotaur grabs you`
- `[foe]~>grab and >slap [you]` => `the minotaur grabs and slaps you`
- `[foe]~ greedily >grab [you]` => `the minotaur greedily grabs you`

## Contractions `/`

Certain combinations of words get contracted automatically. This can be prevented by adding `/` between the two words (no spaces)

- `You have` => `You've`
- `You/have` => `You have`
- `She is` => `She's`
- `She/is` => `she is`
- `do not` => `don't`
- `do/not` => `do not`

Note that the `/` only gets removed if the two words would contract normally, in the example below the two words don't contract so the entire construct is left as is.

- `he/she` => `he/she`

## Markdown

All text gets parsed as [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

This allows you to easily `*`_emphasize_`*` or `**`**bold**`**` text and insert paragraphs using a double new line. See the [markdown docs](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for full capabilities.

Additionally, the parser will also understand quoted text using `"` , even though this isn't basic markdown syntax.

```js
;`paragraph *one*

paragraph "two"

paragraph **three**`
```

=> `<p>paragraph <em>one</em></p><p>paragraph <q>two</q></p><p>paragraph <strong>three</strong></p>`

## Cleanup

The parser automatically cleans up messy text. In this section we'll explain the things it fixes for you.

### Trim text

Trailing blank spaces are removed. Double spaces are collapsed to single spaces. Empty paragraphs are removed.

### Capitalize

Capitalizes the first word of each sentence.

### undefined

Any instances of the word `undefined` are removed. This allows you to be more lenient when writing template literals as any `undefined` values will be ignored instead of being output as `undefined`.
