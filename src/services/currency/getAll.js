// @flow strict
import type { FetchedCurrencies } from "../../records/Currency";

export type Module = "search" | "booking" | "mmb";

export type Options = {|
  url?: string,
|};

type Params = {|
  module?: Module,
  options?: Options,
|};

const getAll = ({ module = "search", options }: Params = {}): Promise<FetchedCurrencies> =>
  Promise.all([
    fetch(`${options?.url || "https://finance-launchpad.skypicker.com"}/${module}`)
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
        enabledOnAffilId: entry.affil_id.length > 0 ? entry.affil_id : "",
        format: entry.format,
        uncertainFormat: false,
        rate: 1 / rates[entry.code.toUpperCase()].value,
      }))
      .reduce((acc, next) => ({ ...acc, [next.id]: next }), {}),
  );

export default getAll;
