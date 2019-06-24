// @flow strict
import * as R from "ramda";

import { currencyDefault } from "../../../records/Currency";
import type { Currency, Currencies } from "../../../records/Currency";

function resolveCurrency(all: Currencies, available: Currencies, candidate: string): Currency {
  if (available[candidate]) {
    return available[candidate];
  }

  if (all[candidate] && all[candidate].fallback && available[all[candidate].fallback.id]) {
    return available[all[candidate].fallback.id];
  }

  if (available[currencyDefault.id]) {
    return available[currencyDefault.id];
  }

  return available[R.head(R.sortBy(R.identity, R.keys(available))) || ""];
}

export default resolveCurrency;
