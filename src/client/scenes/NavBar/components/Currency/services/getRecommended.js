// @flow strict
import * as R from "ramda";

import type { Country } from "client/public/records/Country";
import type { LangInfo } from "client/public/records/LangInfo";
import type { Currencies } from "client/public/records/Currency";

const MOST_USED_CURRENCIES = ["usd", "eur", "gbp", "aud", "sek", "dkk"];
const MAX_RECOMMENDED_CURRENCIES = 4;

const getRecommended = (country: ?Country, language: LangInfo, currencies: Currencies) =>
  R.pick(
    R.take(
      MAX_RECOMMENDED_CURRENCIES,
      R.filter(
        // eslint-disable-next-line no-underscore-dangle
        R.has(R.__, currencies),
        R.uniq([country && country.currency, language.currency, ...MOST_USED_CURRENCIES]),
      ),
    ),
    currencies,
  );

export default getRecommended;
