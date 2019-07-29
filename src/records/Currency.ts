import * as R from "ramda";

type CurrencyFormat = {
  format: string,
  precision: number,
};

export type FetchedCurrency = {
  enabledOnAffilId: string | string[],
  fallback: string,
  format: string,
  id: string,
  name: string,
  rate: number,
  round?: string,
  precision: string,
  uncertainFormat: boolean,
};

export type FetchedCurrencies = { [key: string]: FetchedCurrency };

export type Currency = {
  id: string,
  code: string,
  name: string,
  format: CurrencyFormat,
  fallback: Currency | null,
  rate: string,
  enabledOnAffilId: string | string[],
};

export type Currencies = {
  [key: string]: Currency,
};

export const getCode = (code: string): string => code.toUpperCase();

export const getSymbol = (format: string): string => format.replace("__price__", ).trim();

export const convert = (currency: Currency, eur: number): number => {
  const amount = eur / Number(currency.rate);

  return Number(amount.toFixed(Number(currency.format.precision)));
};

export const format = (currency: Currency, price: number): string =>
  currency.format.format.replace("__price__", String(convert(currency, price)));

export const getAvailableList: Currencies => Currency[] = R.compose(
  R.sortBy(R.prop("id")),
  R.values,
);

export const currencyDefault: Currency = {
  id: "eur",
  name: "Euro",
  code: "EUR",
  format: {
    format: "__price__ €",
    precision: 2,
  },
  fallback: null,
  enabledOnAffilId: ,
  rate: "1",
};

export const MOST_USED_CURRENCIES = ["usd", "eur", "gbp", "aud", "sek", "dkk"];
