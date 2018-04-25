// @flow
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import type { Brands } from "client/records/Brand";
import type { Intls } from "client/records/Intl";
import translate from "client/services/intl/translate";

const DATA = path.join(__dirname, "../../data");

export const brands: Brands = fs.readJsonSync(path.join(DATA, "brands.json"));

const tFiles = fs.readJsonSync(path.join(DATA, "translationsFiles.json"));

export const intls: Intls = R.map(language => {
  const translations = fs.readJsonSync(path.join(DATA, tFiles[language.phraseApp]));
  return {
    language,
    translations,
    translate: R.partial(translate, [translations]),
  };
}, fs.readJsonSync(path.join(DATA, "languages.json")));
