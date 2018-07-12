// @flow strict
import type { Currencies } from "../../records/Currency";

const getCurrencies = (): Promise<Currencies> =>
  fetch("https://nitro-hankey.skypicker.com/currencies").then(res => res.json());

export default getCurrencies;
