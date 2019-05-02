// @flow strict
import * as R from "ramda";

import type { Currencies, FetchedCurrencies, FetchedCurrency } from "../../../records/Currency";

const rewriteCurrencies = (currencies: FetchedCurrencies): Currencies =>
  R.map(currency => {
    const newCurrency = (currencyItem: FetchedCurrency) => {
      const { id, name, rate, enabledOnAffilId, format, round, uncertainFormat } = currencyItem;
      return {
        id,
        name,
        rate: String(rate),
        enabledOnAffilId,
        fallback: null,
        code: id.toUpperCase(),
        format: {
          format,
          precision: Number(round),
          isUncertain: uncertainFormat,
        },
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
