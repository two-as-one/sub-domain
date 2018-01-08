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

## [0.4.1] - 2018-01-08
### Added
- `Backspace` and `Escape` keys can now be used for `back` and `cancel` options

### Changed
- Changed default sizes for newly grown parts
- most instances of `cancel` have been changed to `back`

### Fixed
- Page layout during combat on mobile

## [0.4.0] - 2018-01-05
### Changed
- incremented version number to indicate save-breaking changes

## [0.3.2] - 2018-01-05
### Added
- [WIP] `conjoined` perk - currently classified as a perk but this is likely to change in the future
- added `nipples` body part and description on character sheet
- added `nipple growth` transformations to `milk` and `minotaur cum`
- added `nipple multiplication` transformation to `minotaur cum`

### Changed
- instances of `your body` `your head` `your face` `you` to be dynamic based on `conjoined` perk

## [0.3.1] - 2017-12-20
### Added
- `jerk off` option when masturbating
- `milk tits` option when masturbating
- `finger pussy` option when masturbating
- the ability for `breasts` to be milky
- `increase breast milk` transformation to `minotaur cum`

### Changed
- some sexual positions are now disabled instead of hidden when unavailable, due to `impotence` for instance
- when consuming an item, if more are left the game will go back to inspecting that item instead of listing all the items

### Removed
- `[WIP]` label from `masturbate`

## [0.3.0] - 2017-12-19
### Added
- `Masturbate` option available via `self` menu
  - only `finger ass` option available so far but more to be added later

### Fixed
- `Hands`, `Feet` and `Mouth` having a default size of `0`
  - must start a new game to take effect

## [0.2.6] - 2017-12-18
### Added
- A message when entering an area for the first time
- %-bars to player stats on `self` screen
- The ability for specific pieces of text to not auto-type but instead appear immediately. Used for `combat` and `self`

### Changed
- renamed `examine self` to `self` - The player will be doing more than just examining themselves here... if you know what I mean

### Removed
- Camp description from main state, this will be moved to it's own `camp` section later

## [0.2.5] - 2017-12-13
### Added
- Udder body part
- Udder transformations via minotaur cum
- More adjectives describing breasts

### Fixed
- Bug that would crash the game when discovering the forest
- Bug where the player was unable to sleep when wounded
- Issues where impotence perk wouldn't be respected by certain descriptions

## [0.2.4] - 2017-11-28
### Added
- Extra message when travelling to a different area
- Extra message when exploring the beach

### Changed
- Milk restores 8 hunger, up from 3
- Reduced sensitivity of most parts by about 25%
- Breast sensitivity is reduced by 50% if their size is 0

## [0.2.3] - 2017-11-24
### Fixed
- Inventory not displaying items

## [0.2.2] - 2017-11-24
### Added
- Fade out when the player loses combat
- Fade out in character creation before title screen

### Changed
- If the player is severely wounded at night time, they can now immediately sleep through the night instead of having to rest until healed first

### Fixed
- Items with quantity 0 appearing in player inventory

## [0.2.1] - 2017-11-23
### Added
- Day/Night cycles
- The ability to sleep or rest until healed
- The ability for parts to get dilated (from fucking)
- The ability for the interface to fade out
- The ability for options do be disabled instead of hidden
- Message when the player has no perks yet
- Message when the player is severely wounded

### Removed
- Automatic healing at the end of combat, the player must no rest
- Automatic reduction of lust to 0 at the end of combat, the player must now reach an orgasm to reduce it back down to 0
- Rock from starting inventory