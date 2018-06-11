// @flow strict
import * as R from "ramda";

import type { Currencies } from "client/records/Currency";

const isContained = R.flip(R.contains);

const filterCurrencies = (affil: string, whitelist: string[], currencies: Currencies): Currencies =>
  R.filter(
    R.allPass([
      R.compose(
        isContained(whitelist),
        R.prop("id"),
      ),
      R.compose(
        R.either(R.complement(R.is(Array)), R.any(isContained(R.toLower(affil)))),
        R.prop("enabledOnAffilId"),
      ),
    ]),
    currencies,
  );

export default filterCurrencies;
