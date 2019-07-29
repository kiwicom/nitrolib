import { Definition, BaggageCategory } from "../../../records/Baggage";

export default function filterNewDefinitions(
  definitions: Definition[],
  bagType: BaggageCategory,
): Definition[] {
  return definitions.filter(def => {
    if (bagType === "handBag") {
      return def.category === "cabinBag" || def.category === "personalItem";
    }
    return def.category === "holdBag";
  });
}
