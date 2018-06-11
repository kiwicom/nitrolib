// @flow strict
import * as R from "ramda";

import { currencyDefault } from "client/records/Currency";
import type { Currency, Currencies } from "client/records/Currency";

function resolveCurrency(all: Currencies, available: Currencies, candidate: string): Currency {
  if (available[candidate]) {
    return available[candidate];
  }

  if (all[candidate] && available[all[candidate].fallback]) {
    return available[all[candidate].fallback];
  }

  if (available[currencyDefault.id]) {
    return available[currencyDefault.id];
  }

  return available[R.head(R.sortBy(R.identity, R.keys(available)))];
}

export default resolveCurrency;
