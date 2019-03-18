// @flow
import * as React from "react";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import R from "ramda";

import type {
  BaggageType,
  BaggageSubCategory,
  BaggageCategory,
  PassengerGroup,
  Combinations,
  Combination,
  HandBagDefinition,
  HoldBagDefinition,
  OptionBaggage,
} from "../../../records/Baggage";
import Translate from "../../components/Translate/index";

type IconSize = "small" | "medium" | "large";
type IconColor =
  | "attention"
  | "primary"
  | "secondary"
  | "tertiary"
  | "info"
  | "success"
  | "warning"
  | "critical";

export const getTextFromCategory = (
  category: BaggageSubCategory,
  transform?: (value: string) => string,
) => {
  switch (category) {
    case "personalItem":
      return <Translate t="baggage_modal.select.personal_item" />;
    case "cabinBag":
      return <Translate t="baggage_modal.select.cabin_bag" />;
    case "holdBag":
      return <Translate t="baggage_modal.select.checked_bag" transform={transform} />;
    default:
      return null;
  }
};

export const getIconFromCategory = (
  category: BaggageSubCategory,
  size: IconSize,
  color: IconColor,
) => {
  switch (category) {
    case "personalItem":
      return <BaggagePersonalItem size={size} color={color} />;
    case "cabinBag":
      return <BaggageCabin size={size} color={color} />;
    case "holdBag":
      return <BaggageChecked size={size} color={color} />;
    default:
      return null;
  }
};
type SummaryPriceArgs = {
  combinationIndices: {
    holdBag: Array<number>,
    handBag: Array<number>,
  },
  combinations: Combinations,
};

export const getTotalPrice = ({ combinationIndices, combinations }: SummaryPriceArgs): number => {
  const { handBag, holdBag } = combinations;
  const holdBagsTotalPrice = combinationIndices.holdBag.reduce(
    (acc, index) => acc + holdBag[index].price.amount,
    0,
  );
  const handBagsTotalPrice = combinationIndices.handBag.reduce(
    (acc, index) => acc + handBag[index].price.amount,
    0,
  );
  return holdBagsTotalPrice + handBagsTotalPrice;
};

export const getOptionItems = (
  defs: Array<HoldBagDefinition> | Array<HandBagDefinition>,
  indices: Array<number>,
) => {
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
};

type GetOptionsArgsType = {
  baggage: BaggageType,
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
  passengerCategory: PassengerGroup,
  currentCombination?: number,
};

export const getOptions = (args: GetOptionsArgsType): Array<OptionBaggage> => {
  const {
    context,
    currentCombination,
    passengerCategory,
    pickerType,
    baggage: { combinations, definitions },
  } = args;
  const bagDefinitions = definitions[pickerType];

  const indexedCombinations: Array<{ ...Combination, originalIndex: number }> = combinations[
    pickerType
  ]
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter(i =>
      // $FlowFixMe
      R.includes(passengerCategory, i.conditions.passengerGroups),
    );

  const options: Array<OptionBaggage> = indexedCombinations.map(c => ({
    originalIndex: c.originalIndex,
    pickerType,
    price: c.price,
    items: getOptionItems(bagDefinitions, c.indices),
  }));

  if (context === "mmb" && typeof currentCombination === "number") {
    return options.filter(
      o => o.price.amount >= combinations[pickerType][currentCombination].price.amount,
    );
  }

  return options;
};
