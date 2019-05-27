// @flow strict
import type { FetchedCurrencies } from "../../../records/Currency";

const getCurrencies = (): Promise<FetchedCurrencies> =>
  Promise.all([
    fetch("https://finance-launchpad.skypicker.com/search")
      .then(res => res.json())
      .then(res => res.currencies.supported_currencies),
    fetch("https://rates-finance.skypicker.com/").then(res => res.json()),
  ]).then(([list, rates]) =>
    list
      .map(entry => ({
        id: entry.code.toLowerCase(),
        name: entry.name,
        precision: entry.precision,
        fallback: "eur",
        enabledOnAffilId: entry.affil_id.length > 1 ? entry.affil_id : "",
        format: entry.format,
        uncertainFormat: false,
        rate: 1 / rates[entry.code.toUpperCase()].value,
      }))
      .reduce((acc, next) => ({ ...acc, [next.id]: next }), {}),
  );

export default getCurrencies;
