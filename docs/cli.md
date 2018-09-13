# CLI

Run `yarn nitro <command>`. Available commands:
* [Keys](#keys)
* [Fetch](#fetch)

All files are saved into the `<PROJECT_ROOT>/data` folder.

## Keys

* `yarn nitro keys [...globs]`

Collects translation keys wrapped in the `__` function.

**Args:**
* `globs` - a list of globs where to search for translation keys as an argument

**Example:**
* `yarn nitro keys` - only collects Nitrolib's keys
* `yarn nitro keys 'src/**/*.{js,jsx}'` - collects Nitrolib's keys as well as all keys in the `src` folder

**Files:**
* `tkeys.json` - contains a map of all collected translation keys

> Nitrolib also exports its translation keys in the `@kiwicom/nitro/tkeys.json` file

## Fetch

* `yarn nitro fetch [?translations]`

Fetches production data. Requires the `data/tkeys.json` file to exist due to translation whitelisting, see the `keys` command.

**Args:**
* `translations` (optional) - path to a folder with translation files, named `<locale>.json`

**Example:**
* `yarn nitro fetch` - fetches data and translations from *Word*
* `yarn nitro fetch ./node_modules/@kiwicom/translations` - fetches data and translations from the `@kiwicom/translations` NPM package

**Files:**
* `translations/<locale>_<hash>.json` - translations for the given _locale_, cache-busted with the commit _hash_
* `brandLanguages.json` - contains information about languages for different brands, see [BrandLanguage.js](./src/records/BrandLanguage.js)
* `brands.json` - contains brand config, see [Brand.js](src/records/Brand.js)
* `continents.json` - contains a list of continents and their countries, see [Continents.js](src/records/Continents.js)
* `countries.json` - contains basic information about all the world's countries, see [Country.js](src/records/Country.js)
* `languages.json` - contains information about our supported languages, see [LangInfo.js](src/records/LangInfo.js)
* `translationsFiles.json` - contains a map of a _locale_ to its translation file
