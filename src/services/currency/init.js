// @flow
import { MOST_USED_CURRENCIES } from "../../records/Currency";
import type { Currency, Currencies } from "../../records/Currency";
import getCandidate from "./services/getCandidate";
import filterCurrencies from "./services/filterCurrencies";
import getRecommended from "./services/getRecommended";
import resolveCurrency from "./services/resolveCurrency";

export type Input = {|
  currencies: Currencies,
  initialCurrency: string,
  countryCurrency: string,
  languageCurrency: string,
  affiliate: string,
  brandCurrencies: string[],
  mostUsedCurrencies?: string[],
|};

export type Payload = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
|};

const init = ({
  currencies,
  initialCurrency,
  countryCurrency,
  languageCurrency,
  affiliate,
  brandCurrencies,
  mostUsedCurrencies = MOST_USED_CURRENCIES,
}: Input): Payload => {
  const candidate = getCandidate({
    initial: initialCurrency,
    country: countryCurrency,
    lang: languageCurrency,
  });

  const available = filterCurrencies(affiliate, brandCurrencies, currencies);

  const recommended = getRecommended(
    countryCurrency,
    languageCurrency,
    mostUsedCurrencies,
    available,
  );

  return {
    currency: resolveCurrency(currencies, available, candidate),
    available,
    recommended,
  };
};

export default init;
