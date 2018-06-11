// @flow strict
import type { Currencies } from "client/records/Currency";

const getCurrencies = (): Promise<Currencies> =>
  fetch("https://nitro-hankey.skypicker.com/currencies").then(res => res.json());

export default getCurrencies;
