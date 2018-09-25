## Dialogues
Dialogue encounters can be created by extending from `encounters/dialogue/_super`

Just like any other scene, extra FSM states can be added by extending. Refer to the [scene README](../../scenes/README.md) for more info on this.


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
Templates are text files that represent a dialogue tree. A dialogue tree is a branching path of dialogue for the player to interact with. Dialogues can interface with the game and have [conditional branches or trigger events](#conditions-events).

### Parser
Just like any other text in the game, you can use the [parser](../../../PARSER.md) to access game entities and write dynamic text.

```
[foe] grabs [whose:penis].
```
```
>> The minotaur grabs its cock.
```

### Indentation
Indentation is used to indicate linear dialogue. Each new branch of text should be indented one more than the previous one.

**Do not mix tabs and spaces for indentation** - be consistent.

With linear dialogue, the player will only have `…` as an option to proceed to the next piece of dialogue.

```
Greetings traveller!
  Welcome to the world of
   Jurassic Park!
```

```
>> Greetings traveller!
>> …
>> Welcome to the world of
>> …
>> Jurassic Park!
```

Text can span over multiple lines, as long as it has the same indentation it will be considered as a single branch.

```
Receive my gift!
  Ooooof!

  +2 strength
    Great, now you're stronger!
```
```
>> Receive my gift!
>> …
>> Ooooof!

   +2 strength
>> …
>> Great, now you're stronger!

```

### Pointers
**Pointers** are placeholders that point to specific points in the dialogue. These always need to point to a valid ID.

**Pointers** allow dialogue to fold back onto itself or provide branching paths.

```
Greetings traveller!
  -> 1

1. Welcome to the world of
   Jurassic Park!
```
```
>> Greetings traveller!
>> …
>> Welcome to the world of
>> …
>> Jurassic Park!
```

#### pointer syntax
`-> 1`

Replace the number with any valid ID. The space between `->` and `1` is mandatory.

#### ID syntax
`1. `

As with **pointers**, the space between `1.` and the text is mandatory.

### Branching paths
Branching paths are always done via **pointers**. When using a branching path, each branch will represent an option for the player. These are from the player's perspective, so take that into account when writing text.

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

### Conditions & Events
Each dialogue can custom functions to [trigger code](#actions) or check for [conditions](#conditions).

Conditional functions must return a boolean.

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

#### Actions
**Actions** allow the dialogue to execute code. When a specific branch with an **action** is reached, the relevant function will be triggered. This can do anything, even change to a different scene or state.

```
Goodbye stranger
  time to die [ACTION=kill_player]
```

**Actions** can be added anywhere in a branch (start, end, middle...) and won't be visible in the output.

Note: **pointers** don't support **actions**, these must be placed on the actual branch.

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

Note that a branching dialogue becomes linear if only one branch is available, you may want to use [disabled](#disabled) branches instead.


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
