// @flow
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import type { Brands } from "client/records/Brand";
import type { Intls } from "client/records/Intl";
import translate from "client/services/intl/translate";

const DATA = path.join(__dirname, "../../data");

export const brands: Brands = fs.readJsonSync(path.join(DATA, "brands.json"));

export const intls: Intls = R.map(
  language => ({
    language,
    translate: R.partial(translate, [{}]), // TODO translate fn
  }),
  fs.readJsonSync(path.join(DATA, "languages.json")),
);
