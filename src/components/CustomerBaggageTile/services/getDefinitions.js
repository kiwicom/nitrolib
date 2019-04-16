// @flow strict
import * as R from "ramda";

import handleIsCurrentFlag from "./handleIsCurrentFlag";
import filterNewDefinitions from "./filterNewDefinitions";
import type {
  HoldBagTileDefinition,
  BaggageCategory,
  HandBagTileDefinition,
  BaggageType,
} from "../../../records/Baggage";

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
export default function getDefinitions({
  current,
  selected,
  baggage,
  bagType,
  newDefinitions,
}: GetDefinitionsArgs): (HoldBagTileDefinition | HandBagTileDefinition)[] {
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
}
