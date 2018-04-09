// @flow
import fs from "fs-extra";
import path from "path";
import * as R from "ramda";

import { brandDefault } from "client/records/Brand"; // TODO load from fs

const DATA = path.join(__dirname, "../../data");

export const intls = R.map(
  language => ({
    language,
    translations: {}, // TODO load from fs
  }),
  fs.readJsonSync(path.join(DATA, "languages.json")),
);

// TODO load from fs
export const brands = {
  kiwicom: brandDefault,
};
