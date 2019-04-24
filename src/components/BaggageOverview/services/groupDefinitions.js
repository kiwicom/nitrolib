// @flow strict
import * as R from "ramda";

import type { DefinitionWithId } from "../../../records/Baggage";

export default function groupDefinitions(definitions: DefinitionWithId[]) {
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
