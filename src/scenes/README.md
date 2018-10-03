## Game Scenes

#### TitleScreen

The title screen, continue or start a new game

#### CharacterCreation

The scene where the player gets to create their character, also serves as an intro

#### Main

This is the 'default' scene of the game when it's not in any other scene.
Most simple actions can be performed here

#### Combat

This is where the player fights an opponent. The game will go back to `main` once it exists this scene

#### Inventory

This is where the player can manage and use items

#### LevelUp

This is where the player can level up and choose new perks

### Creating new game scenes

1. extend from `_super`
2. extend `FSMStates` and define all states
3. make a function for each state defined by `FSMStates`
4. make sure the `constructor` of you game state calls the first state

Each state must either call `.render()` or forward on to another scene
