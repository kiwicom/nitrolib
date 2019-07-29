
import { Definition } from "../../../records/Baggage";

export default function getOptionItems(defs: Definition[], indices: number[]) {
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
