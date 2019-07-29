import * as R from "ramda";

import { ItemType } from "../../../../../records/Baggage";

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
