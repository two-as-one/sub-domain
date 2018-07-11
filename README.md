## SUB DOMAIN: a spunky story


### For players
##### Online
Visit the [live version](https://sub-domain.herokuapp.com/)

##### Download
Download the distributable `/dist/sub-domain.html` and open it in your browser.
Everything is bundled into this html file so you can play it while offline.


### For developers
1. Clone repo
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. App runs at http://localhost:3000

`/src` contains all the source code for the game. Each folder should have its own README.md file with additional documentation

#### commit hooks
1. `eslint`
2. `prettier`


##### versioning
This app uses [semantic versioning](http://semver.org/).
The savegame is the public API, this means that if a change is made that would break saved data, the major or minor version must be incremented. Otherwise new versions can be released as patches.

To release a new version, you can simply run `npm version patch` - This will increment the version, run a build and commit all of this to git.