// @flow strict
import * as R from "ramda";

import type { FetchedCurrencies, FetchedCurrency } from "../../../records/Currency";

const rewriteCurrencies = (currencies: FetchedCurrencies) =>
  R.map(currency => {
    const newCurrency = (currencyItem: FetchedCurrency) => {
      const { id, name, rate, enabledOnAffilId, format, round } = currencyItem;
      return {
        id,
        name,
        code: id.toUpperCase(),
        fallback: null,
        format: {
          format,
          precision: Number(round),
        },
        rate: String(rate),
        enabledOnAffilId,
      };
    };

    const rewriteFallBack =
      currency.fallback.length > 0 ? newCurrency(currencies[currency.fallback]) : null;

    return {
      ...newCurrency(currency),
      fallback: rewriteFallBack,
    };
  }, currencies);

export default rewriteCurrencies;
