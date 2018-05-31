// @flow strict
import * as R from "ramda";

import type { Currencies } from "client/records/Currency";

const getAvailableCurrencies = (currencies: Currencies, affiliate: string): Currencies =>
  R.filter(
    R.compose(
      R.either(
        R.complement(R.is(Array)),
        R.any(
          // eslint-disable-next-line no-underscore-dangle
          R.contains(R.__, R.toLower(affiliate)),
        ),
      ),
      R.prop("enabledOnAffilId"),
    ),
    currencies,
  );

export default getAvailableCurrencies;
