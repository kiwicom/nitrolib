import * as R from "ramda";

import { Definition } from "../../../records/Baggage";

export default function groupDefinitions(definitions: Definition[]) {
  const groupedDefinitions = definitions.reduce((acc, def) => {
    if (acc[def.index]) {
      acc[def.index].amount += 1;
    } else {
      acc[def.index] = {
        amount: 1,
        ...def,
      };
    }
    return acc;
  }, {});
  return R.values(groupedDefinitions);
}
