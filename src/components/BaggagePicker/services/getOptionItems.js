// @flow strict

import type { HandBagDefinition, HoldBagDefinition } from "../../../records/Baggage";

export default function getOptionItems(
  defs: HoldBagDefinition[] | HandBagDefinition[],
  indices: number[],
) {
  return indices.reduce((acc, optionIndex) => {
    if (acc[optionIndex]) {
      acc[optionIndex].amount += 1;
    } else {
      acc[optionIndex] = {
        amount: 1,
        category: defs[optionIndex].category,
        restrictions: defs[optionIndex].restrictions,
        conditions: defs[optionIndex].conditions,
      };
    }
    return acc;
  }, {});
}
