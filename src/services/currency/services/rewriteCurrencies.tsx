import * as R from "ramda";

import {
  Currency,
  Currencies,
  FetchedCurrencies,
  FetchedCurrency,
} from "../../../records/Currency";

const newCurrency = (currencyItem: FetchedCurrency) => {
  const { id, name, rate, enabledOnAffilId, format, precision, round } = currencyItem;
  return {
    id,
    name,
    code: id.toUpperCase(),
    fallback: null,
    format: {
      format,
      precision: Number(precision || round),
    },
    rate: String(rate),
    enabledOnAffilId,
  };
};

const rewriteCurrencies = (currencies: FetchedCurrencies): Currencies =>
  // $FlowExpected: ramda error
  R.map(currency => {
    const rewriteFallBack =
      currency.fallback.length > 0 ? newCurrency(currencies[currency.fallback]) : null;

    const c: Currency = {
      ...newCurrency(currency),
      fallback: rewriteFallBack,
    };

    return c;
  }, currencies);

export default rewriteCurrencies;
