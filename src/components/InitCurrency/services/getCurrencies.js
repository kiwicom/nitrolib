// @flow strict
import type { FetchedCurrencies } from "../../../records/Currency";

const getCurrencies = (): Promise<FetchedCurrencies> =>
  fetch("https://nitro-hankey.skypicker.com/currencies").then(res => res.json());

export default getCurrencies;
