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

## [0.4.3]
### Added
### Changed
- `breast` size when starting as female from `A-cup` to `C-cup`

### Deprecated
### Removed
### Fixed
### Security

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