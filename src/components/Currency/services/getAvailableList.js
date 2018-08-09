// @flow strict
import * as R from "ramda";

import type { Currency, Currencies } from "../../../records/Currency";

const getAvailableList: Currencies => Currency[] = R.pipe(
  R.values,
  R.sortBy(R.prop("id")),
);

export default getAvailableList;
