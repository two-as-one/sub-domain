## Game mechanics

allow player to grapple (DOM)
allow enemies to submit

introduce 'submissiveness' stat to entities

- reduces the likelihood that the enemy will force submit the player
- increases the likelihood that they will accept sex

add dom/sub to sexual positions
certain enemies may be more likely to accept one or the other

add dom/sub stat to player, grants access to different positions. changes as the player behaves more in one or the other way

perks:
anal womb - ...?
conjoined twin - it's an npc you can talk to while at camp, any action using mouth deals double lust, changes masturbate options
Dom - replaces 'submit' with 'Dom' - allows the player to choose which parts to submit - adds option to change position

temperature affects armor?

enemies:
spunk elemental
bone soldier

nipple penetration perk/position

Gifts:

- Gifts are like perks except that they are gained by other means
- They can immediately grow/remove parts and prevent them from being removed or growing in the future

Shrines:

- Rare encounters when exploring
- Player can choose to pray to receive a `gift`
- Gifts should unlock things that the player would normally not have access to, ie: `hyper shrine`

## areas

## challenge rating

instead of [LVL], show challenge rating in combat

trivial > easy > challenging > difficult > impossible

## design choices

whenever an npc uses him/her for the player, allow the player to correct the npc to use the right gender (this updates the gender of the player, instead of needing an options menu)

## discrepancy between submitting and force submit

it's possible for the opponent to reject submit and then immediately force submit the player
should be more like a switch instead of having randomness involved
this also allows it to be used as a formula for displaying chance

add seductionMessage for udder

## parser

add [weapon(yours)] and [armor(yours)]
add [male] and [female]
add [man] and [woman]

add way for parser to use word A or B depending on whether the subject is plural

update parser playground so that you can pick between bob/alice/charlie as fallback foe
update parser playground to allow for more consistent seeding

reintroduce conditionals

## parts

set min and max sizes for parts where it makes sense
make sure humanReadableSize covers all possible sizes

### add

- eyes
- toes
- fingers
- clit

## stats

## intelligence

player.int > foe.int / 2 -> see hp/lust
player.int > foe.int -> see actual stats when inspecting
player.int > foe.int \* 2 -> see percentage chance against each action (or damage/lust ranges)

make items be yaml-driven
move seduce messages to yaml
make sure the point at which a foe will accept to fuck is also the point at which their penis is not flaccid (a semi is ok!)

# refactor dependencies

less circular dependencies
more top-down
allows tests to be better encapsulated without having to load everything
