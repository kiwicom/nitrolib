// @flow strict
import * as R from "ramda";

import type { HandBagDefinitionWithId, HoldBagDefinitionWithId } from "../../../records/Baggage";

export default function groupDefinitions(
  definitions: (HandBagDefinitionWithId | HoldBagDefinitionWithId)[],
) {
  const groupedDefinitions = definitions.reduce((acc, def) => {
    if (acc[def.id]) {
      acc[def.id].amount += 1;
    } else {
      acc[def.id] = {
        amount: 1,
        ...def,
      };
    }
    return acc;
  }, {});
  return R.values(groupedDefinitions);
}
