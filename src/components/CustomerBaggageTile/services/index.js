// @flow strict
import R from "ramda";
import { Decimal } from "decimal.js";

import { getTotalPrice } from "../../../services/baggage/utils";
import type {
  HoldBagTileDefinition,
  BaggageCategory,
  HandBagTileDefinition,
  Combinations,
  OrderStatusType,
  BaggageType,
} from "../../../records/Baggage";

export const handleIsCurrentFlag = (
  definitions: (HoldBagTileDefinition | HandBagTileDefinition)[],
  commonDefIndices: number[],
) => {
  const memo = [...commonDefIndices];
  return definitions.reduce((acc, def) => {
    if (memo.some(i => i === def.originalIndex)) {
      def.isCurrent = true; // eslint-disable-line
      memo.splice(memo.findIndex(i => i === def.originalIndex), 1); // eslint-disable-line
    }
    // $FlowExpected: Union types issue
    return acc.concat(def);
  }, []);
};

export const filterNewDefinitions = (
  definitions?: (HoldBagTileDefinition | HandBagTileDefinition)[],
  bagType: BaggageCategory,
): (HoldBagTileDefinition | HandBagTileDefinition)[] => {
  if (definitions) {
    return definitions.filter(def => {
      if (bagType === "handBag") {
        return def.category === "cabinBag" || def.category === "personalItem";
      }
      return def.category === "holdBag";
    });
  }
  return [];
};
type GetDefinitionsArgs = {
  current?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  selected?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  baggage: BaggageType,
  bagType: BaggageCategory,
  newDefinitions?: (HoldBagTileDefinition | HandBagTileDefinition)[],
};
export const getDefinitions = ({
  current,
  selected,
  baggage,
  bagType,
  newDefinitions,
}: GetDefinitionsArgs): (HoldBagTileDefinition | HandBagTileDefinition)[] => {
  const { definitions, combinations } = baggage;
  const currentCombination = current && current[bagType];
  const selectedCombination = selected && selected[bagType];

  if (typeof selectedCombination === "number" && typeof currentCombination === "number") {
    const currentIndices = combinations[bagType][currentCombination].indices;
    const selectedIndices = combinations[bagType][selectedCombination].indices;
    const newDefinitionsIndices = R.intersection(selectedIndices, currentIndices);
    const selectedDef = selectedIndices.map(index => {
      // $FlowIssue: https://github.com/facebook/flow/issues/2892
      return {
        originalIndex: index,
        isCurrent: false,
        ...definitions[bagType][index],
      };
    });

    return handleIsCurrentFlag(selectedDef, newDefinitionsIndices);
  }
  return filterNewDefinitions(newDefinitions, bagType);
};

type CalculatePriceArgs = {
  current?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  selected?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  combinations: Combinations,
};
export const calculatePrice = ({
  selected,
  current,
  combinations,
}: CalculatePriceArgs): number | null => {
  if (selected && current) {
    const selectedPrice = getTotalPrice({
      combinationIndices: { handBag: [selected.handBag], holdBag: [selected.holdBag] },
      combinations,
    });
    const currentPrice = getTotalPrice({
      combinationIndices: { handBag: [current.handBag], holdBag: [current.holdBag] },
      combinations,
    });
    const diff = new Decimal(selectedPrice).minus(currentPrice).toFixed(2);
    return new Decimal(diff).toNumber();
  }
  return null;
};

type GetStatusArgs = {
  current?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  selected?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  isProcessing: boolean,
};
export const getStatus = ({
  current,
  selected,
  isProcessing,
}: GetStatusArgs): OrderStatusType | null => {
  if (current && selected && R.equals(current, selected)) {
    return null;
  }
  if (isProcessing) {
    return "processing";
  }
  if (current && selected) {
    return "unpaid";
  }
  return "notAvailable";
};
