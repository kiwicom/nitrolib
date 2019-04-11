// @flow strict
import R from "ramda";

import type { OrderStatusType } from "../../../records/Baggage";

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

export default function getStatus({
  current,
  selected,
  isProcessing,
}: GetStatusArgs): OrderStatusType | null {
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
}
