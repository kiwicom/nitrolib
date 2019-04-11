// @flow strict
import type {
  HoldBagTileDefinition,
  BaggageCategory,
  HandBagTileDefinition,
} from "../../../records/Baggage";

export default function filterNewDefinitions(
  definitions?: (HoldBagTileDefinition | HandBagTileDefinition)[],
  bagType: BaggageCategory,
): (HoldBagTileDefinition | HandBagTileDefinition)[] {
  if (definitions) {
    return definitions.filter(def => {
      if (bagType === "handBag") {
        return def.category === "cabinBag" || def.category === "personalItem";
      }
      return def.category === "holdBag";
    });
  }
  return [];
}
