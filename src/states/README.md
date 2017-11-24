## Game States

#### TitleScreen
The title screen, continue or start a new game

#### CharacterCreation
The state where the player gets to create their character, also serves as an intro

#### Main
This is the 'default' state of the game when it's not in any other state.
Most simple actions can be performed here

#### Combat
This is where the player fights an opponent. The game will go back to `main` once it exists this state

#### Inventory
This is where the player can manage and use items

#### LevelUp
This is where the player can level up and choose new perks

### Creating new game states
1. extend from `_super`
2. extend `FSMStates` and define all sub-states
3. make a function for each sub-state defined by `FSMStates`
4. make sure the `constructor` of you game state calls the first sub-state

Each sub-state must either call `.render()` or forward on to another state