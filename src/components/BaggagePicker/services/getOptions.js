// @flow strict
import * as R from "ramda";
import { Decimal } from "decimal.js";

import getOptionItems from "./getOptionItems";
import type {
  BaggageType,
  BaggageCategory,
  PassengerGroup,
  Combination,
  OptionBaggage,
} from "../../../records/Baggage";

type GetOptionsArgs = {
  baggage: BaggageType,
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
  passengerCategory: PassengerGroup,
  currentCombination?: number,
};

export default function getOptions(args: GetOptionsArgs): OptionBaggage[] {
  const {
    context,
    currentCombination,
    passengerCategory,
    pickerType,
    baggage: { combinations, definitions },
  } = args;
  const bagDefinitions = definitions[pickerType];
  const combinationsCopy = R.clone([combinations])[0];

  const indexedCombinations: { ...Combination, originalIndex: number }[] = combinationsCopy[
    pickerType
  ]
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter(i =>
      // $FlowExpected: Includes is missing in module ramda
      R.includes(passengerCategory, i.conditions.passengerGroups),
    );

  const options: OptionBaggage[] = indexedCombinations.map(c => ({
    originalIndex: c.originalIndex,
    pickerType,
    price: c.price,
    items: getOptionItems(bagDefinitions, c.indices),
  }));

  if (context === "mmb" && typeof currentCombination === "number") {
    const currentComb = indexedCombinations.find(c => c.originalIndex === currentCombination);
    const currentCombinationPrice = currentComb ? currentComb.price.amount : 0;
    return options
      .filter(o => o.price.amount >= currentCombinationPrice)
      .map(option => {
        const priceAmount = option.price.amount;
        const copyOption = R.clone([option])[0];
        copyOption.price.amount = new Decimal(priceAmount)
          .minus(currentCombinationPrice)
          .toNumber();
        return copyOption;
      });
  }

  return options;
}
