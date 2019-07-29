import { Decimal } from "decimal.js";

import getTotalPrice from "../../../services/baggage/getTotalPrice";
import { Combinations } from "../../../records/Baggage";

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

export default function calculatePrice({
  selected,
  current,
  combinations,
}: CalculatePriceArgs): number | null {
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
}
