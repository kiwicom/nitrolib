// @flow strict
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import type { Brands } from "public/records/Brand";
import type { Intls } from "public/records/Intl";
import type { Countries } from "public/records/Country";
import type { Continents } from "public/records/Continents";
import type { BrandLanguages } from "public/records/BrandLanguage";
import translate from "public/services/intl/translate";

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

export const countries: Countries = fs.readJsonSync(path.join(DATA, "countries.json"));

export const continents: Continents = fs.readJsonSync(path.join(DATA, "continents.json"));

export const brandLanguages: BrandLanguages = fs.readJsonSync(
  path.join(DATA, "brandLanguages.json"),
);
