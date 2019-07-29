import * as R from "ramda";

import { Currencies } from "../../../records/Currency";

const isContainedStr = R.flip(R.contains);
const isContainedList = R.flip(R.contains);

const filterCurrencies = (affil: string, whitelist: string[], currencies: Currencies): Currencies =>
  R.filter(
    R.allPass([
      R.compose(
        isContainedList(whitelist),
        R.prop("id"),
      ),
      R.compose(
        R.either(R.complement(R.is(Array)), R.any(isContainedStr(R.toLower(affil)))),
        R.prop("enabledOnAffilId"),
      ),
    ]),
    currencies,
  );

export default filterCurrencies;
