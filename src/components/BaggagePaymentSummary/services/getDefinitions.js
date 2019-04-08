// @flow strict
import type { HoldBagDefinition, HandBagDefinition, ItemType } from "../../../records/Baggage";

const getDefinitions = (
  def: HoldBagDefinition[] | HandBagDefinition[],
  indices: number[],
): ItemType[] => {
  const data = indices.reduce((acc, optionIndex) => {
    const key = optionIndex.toString();
    if (acc[key]) {
      acc[key].amount += 1;
    } else {
      acc[key] = {
        amount: 1,
        category: def[optionIndex].category,
        restrictions: def[optionIndex].restrictions,
        conditions: def[optionIndex].conditions,
      };
    }
    return acc;
  }, {});
  return Object.keys(data).map(key => data[key]);
};

export default getDefinitions;
