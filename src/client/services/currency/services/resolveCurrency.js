// @flow strict
import * as R from "ramda";

import { currencyDefault } from "client/records/Currency";
import type { Currencies } from "client/records/Currency";

const resolveCurrency = (all: Currencies, available: Currencies, candidates: Array<?string>) => {
  const defaultCode = currencyDefault.id;

  const candidate = R.find(Boolean, candidates);
  const candidateSafe = R.toLower(candidate || defaultCode);

  const candidateExisting = R.has(candidateSafe, all) ? candidateSafe : R.head(R.keys(all));

  return R.prop(
    // eslint-disable-next-line no-underscore-dangle
    R.find(R.has(R.__, available), [
      candidateExisting,
      R.pathOr(defaultCode, [candidateExisting, "fallback"], all),
      defaultCode,
    ]),
    available,
  );
};

export default resolveCurrency;
