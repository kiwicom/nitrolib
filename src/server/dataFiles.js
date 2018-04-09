// @flow
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import type { Brands } from "client/records/Brand";
import type { Intls } from "client/records/Intl";

const DATA = path.join(__dirname, "../../data");

export const brands: Brands = fs.readJsonSync(path.join(DATA, "brands.json"));

export const intls: Intls = R.map(
  language => ({
    language,
    translations: {}, // TODO load from fs
  }),
  fs.readJsonSync(path.join(DATA, "languages.json")),
);
