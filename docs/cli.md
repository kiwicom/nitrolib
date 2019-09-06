# CLI

Run `yarn nitro <command>`. Available commands:
* [Keys](#keys)
* [Fetch](#fetch)

All files are saved into the `<PROJECT_ROOT>/data` folder.

## Keys

* `yarn nitro keys [...globs]`

Collects translation keys:
 * wrapped in the `__` function
 * used as the `t` prop in JSX

**Args:**
* `globs` - a list of globs where to search for translation keys as an argument

**Example:**
* `yarn nitro keys` - only collects Nitrolib's keys
* `yarn nitro keys 'src/**/*.{js,jsx}'` - collects Nitrolib's keys as well as all keys in the `src` folder

**Files:**
* `tkeys.json` - contains a map of all collected translation keys

> Nitrolib also exports its translation keys in the `@kiwicom/nitro/tkeys.json` file

## Keys check

* `yarn nitro keys-check`

Checks if _all_ keys are translated. Run `keys` and `translations` to get translations.

## Translations

* `yarn nitro translations [--translations <path>]`

Fetches translations.

**Flags:**
* `path` _optional_ - path to a custom translations folder
* `granular` _optional_ - creates `brandLanguages` folder, which contains `brandName/brand.json` folders

**Requires:**
* The `data/tkeys.json` file to exist due to translation whitelisting, see the `keys` command
* The `@kiwicom/translations` package installed if not using a custom project

**Example:**
* `yarn nitro translations` - fetches data
* `yarn nitro translations --path ./locales` - fetches data and translations from a custom folder

**Files:**
* `translations/<locale>_<hash>.json` - translations for the given _locale_, cache-busted with the commit _hash_
* `brandLanguages.json` - contains information about languages for different brands, see [BrandLanguage](./records#brandlanguage)
* `translationsFiles.json` - contains a map of a _locale_ to its translation file

## Fetch

* `yarn nitro fetch`

Fetches production data.

**Example:**
* `yarn nitro fetch` - fetches data

**Flags:**
* `granular` _optional_ - creates next folders: `brands, airlines, countries, languages` instead of single json.files

**Files:**
* `airlines.json` - contains basic information about supported airlines, see [Airline.js](./records#airline)
* `brands.json` - contains brand config, see [Brand](./records#brand)
* `continents.json` - contains a list of continents and their countries, see [Continents](./records#continents)
* `countries.json` - contains basic information about all the world's countries, see [Country](./records#country)
* `languages.json` - contains information about our supported languages, see [LangInfo](./records#langinfo)
