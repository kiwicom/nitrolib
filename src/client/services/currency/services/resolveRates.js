// @flow strict
import * as R from "ramda";

import type { Currencies } from "client/records/Currency";

type Data = {|
  currencies: {|
    edges: Array<{|
      node: {|
        code: string,
        rate: number,
      |},
    |}>,
  |},
|};

const resolveRates = (data: Data, currencies: Currencies) => {
  const ratesMap = data.currencies.edges.reduce(
    (acc, item) => R.assoc(item.node.code, item.node.rate, acc),
    {},
  );

  return R.map(
    currency => R.assoc("rate", R.propOr(currency.rate, currency.id, ratesMap), currency),
    currencies,
  );
};

export default resolveRates;
