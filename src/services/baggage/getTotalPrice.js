// @flow strict
import { Decimal } from "decimal.js";

import type { Combinations } from "../../records/Baggage";

type GetTotalPriceArgs = {
  combinationIndices: {
    holdBag: number[],
    handBag: number[],
  },
  combinations: Combinations,
};

export default function getTotalPrice({
  combinationIndices,
  combinations,
}: GetTotalPriceArgs): number {
  const { handBag, holdBag } = combinations;
  const holdBagsTotalPrice = combinationIndices.holdBag.reduce(
    (acc, index) => new Decimal(holdBag[index].price.amount).plus(acc),
    0,
  );
  const handBagsTotalPrice = combinationIndices.handBag.reduce(
    (acc, index) => new Decimal(handBag[index].price.amount).plus(acc),
    0,
  );
  const sum = new Decimal(holdBagsTotalPrice).plus(handBagsTotalPrice).toFixed(2);

  return new Decimal(sum).toNumber();
}
