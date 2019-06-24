// @flow strict
import * as R from "ramda";

import type { Currency, Currencies } from "../../../records/Currency";

const MAX_RECOMMENDED_CURRENCIES = 4;

const getRecommended = (
  countryCurrency: ?string,
  languageCurrency: ?string,
  mostUsed: string[],
  available: Currencies,
): Currency[] =>
  R.pipe(
    R.uniq,
    R.map(c => available[c]),
    R.filter(Boolean),
    R.take(MAX_RECOMMENDED_CURRENCIES),
  )([countryCurrency || "", languageCurrency || "", ...mostUsed]);

export default getRecommended;
