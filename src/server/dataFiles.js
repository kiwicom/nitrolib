// @flow strict
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import type { Brands } from "client/public/records/Brand";
import type { Intls } from "client/records/Intl";
import type { Countries } from "client/records/Country";
import type { Continents } from "client/records/Continents";
import translate from "client/services/intl/translate";

const DATA = path.join(__dirname, "../../data");

export const brands: Brands = fs.readJsonSync(path.join(DATA, "brands.json"));

const tFiles = fs.readJsonSync(path.join(DATA, "translationsFiles.json"));

const languages = fs.readJsonSync(path.join(DATA, "languages.json"));

export const intls: Intls = R.map(language => {
  const translations = fs.readJsonSync(path.join(DATA, tFiles[language.phraseApp]));
  return {
    language,
    translations,
    translate: R.partial(translate, [translations]),
  };
}, languages);

export const langNames: { [string]: string } = R.map(R.prop("name"), languages);

export const countries: Countries = fs.readJsonSync(path.join(DATA, "countries.json"));

export const continents: Continents = fs.readJsonSync(path.join(DATA, "continents.json"));
