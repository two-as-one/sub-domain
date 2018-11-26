## Dialogues

Dialogue encounters can be created by extending from `encounters/dialogue/_super`

`Dialogue` extends from `scene`, and thus extra FSM states can be added. `character-creation` is an example of a scene with an extra FSM state.
Refer to the [scene README](../../scenes/README.md) for more info on this.

### `ingest(template)`

You must ingest a template in the constructor of your dialogue.
See [template syntax](#template-syntax) below.

```js
import DialogueEncounter from "encounters/dialogue/_super"
import template from "./template.txt"

export default class CustomDialogue extends DialogueEncounter {
  constructor(game) {
    super(game)
    this.ingest(template)
  }
}
```

## Template syntax

Templates are text files that represent a dialogue tree. A dialogue tree is a branching path of dialogue for the player to interact with. Dialogues can interface with the game and can [trigger events](#actions) or have [conditional branches](#conditions).

### Parser

Remember that just like any other text in the game, you can use the [parser](../../../PARSER.md) to access game entities and write dynamic text.

```
[foe] grabs [their:penis].
```

```
>> The minotaur grabs its cock.
```

### Linear Dialogue

Linear dialogue is text where the player doesn't need to make any choices. The only choice they get to make is to advance the dialogue to the next branch with `…`.

See the next entry about [Indentation](#indentation) for examples, as these are usually used in combination.

Linear dialogue must start with `...` and is usually indented, though it can also be used in combination with [pointers](#pointers).

### Indentation

Indentation is used to indicate new branches in the dialogue. Each new branch of text should be indented one more than the previous one.

**Do not mix tabs and spaces for indentation** - be consistent.

Example of indentation for linear dialogue:

```
Greetings traveller!
  ...Welcome to the world of
   ...Jurassic Park!
```

```
>> Greetings traveller!
>> …
>> Welcome to the world of
>> …
>> Jurassic Park!
```

Text can span over multiple lines, as long as it has the same indentation. It will still be counted as the same branch.

```
Receive my gift!
  ...Ooooof!

  +2 strength
    ...Great, now you're stronger!
```

```
>> Receive my gift!
>> …
>> Ooooof!

   +2 strength
>> …
>> Great, now you're stronger!
```

### Branching paths

Branching paths are points in the dialogue where the player gets to make a choice. These **must** be done via [pointers](#pointers).

### Pointers

A **Pointer** is a reference that points to specific location in the dialogue. It must always point to a valid ID.

**Pointers** allow for [branching paths](#branching-paths) and for branches to join back into linear dialogue.

```
Are you a boy or a girl?
 -> 1
 -> 2

1. I'm a boy!
  -> 3

2. I'm a girl!
  -> 3

3. Ah, ok …
```

```
>> Are you a boy or a girl?
>> I'm a boy!
>> Ah, ok …
```

#### pointer syntax

`-> 1`

Replace the number with any valid ID. The space between `->` and `1` is mandatory.

#### ID syntax

`1.`

As with **pointers**, the space between `1.` and the text is mandatory.

### Conditions & Events

Each dialogue can have custom functions to [trigger code](#actions) or check for [conditions](#conditions).

Functions intended to be used for conditions **must return a boolean**.

```js
export default class CustomDialogue extends DialogueEncounter {
  get functions() {
    return {
      is_sexy: () => true,
      kill_player: () => player.kill(),
      ...
    }
  }
}
```

Note: **pointers** don't support **actions/conditions/disabled**, these must be placed on the actual branch the pointer refers to.

#### Actions

**Actions** allow the dialogue to execute game code. When a specific branch with an **action** is reached, the relevant function will be triggered. This can do anything, including changing to a different scene or state.

```
Goodbye stranger
  time to die [ACTION=kill_player]
```

**Actions** can be added anywhere in a branch (start, end, middle...) and won't be visible in the output.

#### Conditions

Conditions allow branches to be dynamically hidden from the player. The branch will only become available to the player if the condition is met.

```
I like your looks.
 -> 1
 -> 2

1. Especially your cock! [REQUIRED=player_is_male]

2. Especially your tits! [REQUIRED=player_is_female]
```

Be careful not to make dead-ends when using conditions.

#### Disabled

Disabled branches are similar to [conditional](#conditions) branches except that they will still be visible to the user but not available to be picked.

```
Are you a boy or a girl?
 -> 1
 -> 2

1. I'm a boy! [DISABLED=player_is_female]

2. I'm a girl! [DISABLED=player_is_male]
```

As with conditions, be careful not to create dead-ends.
