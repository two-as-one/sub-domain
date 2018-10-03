### Items

To make a new item, create a new file in the appropriate folder and extend `_super` from said folder. Only use lower-case alphanumeric characters and dashes (`-`) for the file name as it will be used in the code.

#### 1. extend `name`

This is the human-readable name of the item.

#### 2. consumables

- extend `description`, this is the description of the item as the player examines it.
- extend `consume`, this function must apply the effects of the item onto the player and return a string description of what happened.

#### 3. armor and weapons

TBA
