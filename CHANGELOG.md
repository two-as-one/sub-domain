# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [0.4.23] - 2018-12-17

### Added

- added test entity Dave (the genderless slime)
- added the ability to give the parser a seed to produce consistent results
- added rounding to part sizes

### Changed

- automated tests for parser
  - now has a big config file with all kinds of specific tests
- changed default foe from Bob to Dave

## [0.4.22] - 2018-11-26

### Added

- added groundwork for unit tests, `npm test` to run them
- added the ability to boot the game straight into a specific scene, useful for debugging. Enabled via query string `?scene=name-of-scene`
- added a parser playground. Enabled via query string `?scene=parser-playground`
- added `bob`, a male test entity
- added `alice`, a female test entity
- added `charlie`, a gender-neutral test entity
- added a library of strings to more easily manage game text without having to look at code (yaml)
- added the ability to have parsed text with debug info, enabled via query string `?debug`

### Changed

- all randomness in the game now goes through `chance.js` this allows it to be seeded and produce consistent results. This is mainly useful for the parser playground and unit tests
- refactored entities to be able to be configured via raw json
- refactored combat so that each encounter is now driven by a single `yaml` config file which includes:
  - opponent config
  - positions config
  - all encounter-specific text
- major refactoring to the parser (README to be updated later)

### Removed

- removed conditionals from the parser, these may be reintroduced at a later point

## [0.4.21] - 2018-10-15

### Added

- arms body part
- butt body part
- hips body part
- legs body part
- added extra masturbate options

### Changed

- Challenge rating is now displayed in combat instead of LVL
- changed some wording in minotaur encounter
- body parts can now be accessed by any of their synonyms in the parser

### Fixed

- Fixed masturbate

## [0.4.20] - 2018-10-03

### Changed

- Changed beach area to match character creation story

## [0.4.19] - 2018-10-03

### Fixed

- Fixed bug where the index page template wasn't getting parsed

## [0.4.18] - 2018-10-02

### Added

- new dialogue parser
- having a high enough perception now allows the player to see success chance or damage range of actions during combat

### Changed

- combat formulas separated out into their own file for better control/overview of game mechanics
- totally redesigned character creation and intro story

## [0.4.17] - 2018-08-23

### Added

- added `perception` stat
  - grants additional information to the player
    - see opponent hp/lust
    - see opponent stats when examining
  - not fully implemented

### Changed

- removed hunger mechanic and all code related to it (hunger is a lame mechanic)
- consuming items now always has an effect
- chance to gain exp added to the list of possible effects
- `gear` and `perks` removed from the `self` menu until these mechanics become relevant

### Fixed

- fixed minotaur having two dicks
- fixed layout of player/enemy health/lust bars during combat

## [0.4.16] - 2018-08-22

### Added

- added `[item]`, `[xp]`, `[damage]` and `[lust]` support to the parser
  - `[item]` describes the last item interacted with
  - `[xp]` describes the last amount of exp gained by the subject, (may need to specify with `(you)`)
  - `[damage]` describes the last amount of damage received by the subject, (may need to specify with `(you)` or `(foe)`)
  - `[lust]` describes the last amount of lust received by the subject, (may need to specify with `(you)` or `(foe)`)
- added fallback entities for the parser to use if the current scene lacks them
  - `(foe)` falls back to `nobody`
  - `(item)` falls back to `a rock`

### Fixed

- fixed infections not working

## [0.4.15] - 2018-08-17

### Changed

- big changes made to the parser, refer to PARSER.md for documentation
- all entities now have parts like the player, allowing them to be used by the parser

## [0.4.14] - 2018-08-02

### Fixed

- fixed security vulnerability by upgrading dependencies
- fixed parser only parsing first occurrence of `[a]` in a blob of text

## [0.4.13] - 2018-07-31

### Fixed

- fixed security vulnerabilities by upgrading dependencies

## [0.4.12] - 2018-07-31

### Fixed

- fixed critical bug that prevented the game from running

## [0.4.11] - 2018-07-31

### Added

- The parser now supports `[a]` and `[an]`
- The game now supports sub-scenes, these are mini-scenes that can be reused and injected into the current scene without interrupting it
  - ie, inspecting an item or opening the player inventory

## [0.4.10] - 2018-07-16

### Changed

- Version number is now a link and points to this document
- The player no longer gains perks when leveling up - perks will only be obtainable via in-game events
- Text parser now supports conditions in the form of `[condition?foo|bar]`

### Removed

- removed perks that didn't fit with the game direction
- removed `slippery when wet` perk
- removed `subbie` perk
- removed `total sub` perk
- removed `succubus` perk

### Fixed

- Minotaur-spunk now has `0.9` transformation chance, up from `0.25`

## [0.4.9] - 2018-07-13

### Added

- Added documentation for the parser

### Changed

- significant upgrades were made to the parser
  - verbs can now conjugate for any subject, not just pronouns
  - now automatically conjugates verbs (when using `~` and `>` to mark subject and verb)
  - now automatically omit words with a percentage chance ~ `your 50%sexy cock`
  - now gets rid of `undefined`
  - can now access global properties via `[]` (more docs on this soon™)

## [0.4.8] - 2018-07-11

### Fixed

- Fixed 404 when hosted on heroku

## [0.4.7] - 2018-07-11

### Added

- Added travel time between areas based on their coordinates on the map
- Added `camp` option to main screen, currently shows description of camp and current time - more stuff to be added later

### Changed

- plenty of under the hood improvements
- Changed Masturbate encounter
  - added more copy to each position
  - temporarily disabled `jerk off` `milk tits` and `finger pussy` as copy needs to be written

### Removed

- Removed `frotting` position from `minotaur` encounter

## [0.4.6] 2018-02-02

### Changed

- Changed mostly behind the scenes stuff, hopefully no new bugs

## [0.4.5] 2018-01-29

### Added

- Added `increase vagina size` transformation from `peculiar clam`

### Changed

- Changed wording for some transformations
- Changed wording for some items

### Removed

- Removed `grow extra vagina` transformation from `peculiar clam`

### Fixed

- Fixed incorrect `you're` and `you've` contractions

## [0.4.4] - 2018-01-25

### Fixed

- Fixed the game not working D:

## [0.4.3] - 2018-01-24

### Changed

- `breast` size when starting as female from `A-cup` to `C-cup`
- significant under-the-hood changes in terms of grammar an sentence structure to allow for dynamic conjugation/pluralization/contractions/capitalization

## [0.4.2] - 2018-01-09

### Added

- Added `vial of minotaur spunk` item, looted from `minotaur`
- Added `wet dreams`

### Changed

- Changed how the chance of a transformation is calculated
  - Instead of being part of the item, this is now part of the transformation itself
  - First a transformation is picked from the list of possible transformation. Then a roll is made for that transformation to test if it gets applied.
- Renamed `milk` to `bottled milk`
- `succubus` perk now also restores some HP
- Changed description on `succubus` perk to specify only fresh cum
- Changed order of options on `main screen`

## [0.4.1] - 2018-01-08

### Changed

- `Backspace` and `Escape` keys can now be used for `back` and `cancel` options
- Changed default sizes for newly grown parts
- Most instances of `cancel` have been changed to `back`

### Fixed

- Fixed page layout during combat on mobile

## [0.4.0] - 2018-01-05

### Changed

- Incremented version number to indicate save-breaking changes

## [0.3.2] - 2018-01-05

### Added

- Added [WIP] `conjoined` perk - currently classified as a perk but this is likely to change in the future
- Added `nipples` body part and description on character sheet
- Added `nipple growth` transformations to `milk` and `minotaur cum`
- Added `nipple multiplication` transformation to `minotaur cum`

### Changed

- Changed instances of `your body` `your head` `your face` `you` to be dynamic based on `conjoined` perk

## [0.3.1] - 2017-12-20

### Added

- Added `jerk off` option when masturbating
- Added `milk tits` option when masturbating
- Added `finger pussy` option when masturbating
- Added the ability for `breasts` to be milky
- Added `increase breast milk` transformation to `minotaur cum`

### Changed

- Some sexual positions are now disabled instead of hidden when unavailable, due to `impotence` for instance
- When consuming an item, if more are left the game will go back to inspecting that item instead of listing all the items

### Removed

- Removed `[WIP]` label from `masturbate`

## [0.3.0] - 2017-12-19

### Added

- Added `Masturbate` option available via `self` menu
  - Only `finger ass` option available so far but more to be added later

### Fixed

- Fixed `Hands`, `Feet` and `Mouth` having a default size of `0`
  - Must start a new game to take effect

## [0.2.6] - 2017-12-18

### Added

- Added a message when entering an area for the first time
- Added percentage-bars to player stats on `self` screen
- Added the ability for specific pieces of text to not auto-type but instead appear immediately. Used for `combat` and `self`

### Changed

- Renamed `examine self` to `self` - The player will be doing more than just examining themselves here... if you know what I mean

### Removed

- Removed camp description from main state, this will be moved to it's own `camp` section later

## [0.2.5] - 2017-12-13

### Added

- Added `udder` body part
- Added `udder` transformations via `minotaur cum`
- Added more adjectives describing `breasts`

### Fixed

- Fixed bug that would crash the game when discovering the forest
- Fixed bug where the player was unable to sleep when wounded
- Fixed issues where `impotence` perk wouldn't be respected by certain descriptions

## [0.2.4] - 2017-11-28

### Added

- Added extra message when travelling to a different area
- Added extra message when exploring the `beach`

### Changed

- `Milk` restores `8` hunger, up from `3`
- Reduced sensitivity of most parts by about `25%`
- Breast sensitivity is reduced by `50%` if their size is `0`

## [0.2.3] - 2017-11-24

### Fixed

- Fixed inventory not displaying items

## [0.2.2] - 2017-11-24

### Added

- Added fade out when the player loses combat
- Added fade out in character creation before title screen

### Changed

- If the player is severely wounded at night time, they can now immediately sleep through the night instead of having to rest until healed first

### Fixed

- Fixed items with quantity 0 appearing in player inventory

## [0.2.1] - 2017-11-23

### Added

- Added Day/Night cycles
- Added the ability to sleep or rest until healed
- Added the ability for parts to get dilated (from fucking)
- Added the ability for the interface to fade out
- Added the ability for options do be disabled instead of hidden
- Added a message when the player has no perks yet
- Added a message when the player is severely wounded

### Removed

- Removed automatic healing at the end of combat, the player must now rest
- Removed automatic reduction of lust to 0 at the end of combat, the player must now reach an orgasm to reduce it back down to 0
- Removed `Rock` from starting inventory
