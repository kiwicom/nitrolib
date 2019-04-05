// @flow strict
import R from "ramda";

import type { ItemType } from "../../../../../records/Baggage";

const getAirlinesWithPriorityBoarding = (itemsArray: ItemType[]): string[] => {
  const airlines = itemsArray.reduce((acc, item) => {
    if (item.conditions && item.conditions.isPriority) {
      return [...acc, ...item.conditions.isPriority];
    }
    return acc;
  }, []);
  return R.uniq(airlines);
};

export default getAirlinesWithPriorityBoarding;
