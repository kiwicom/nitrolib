import * as React from "react";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";

import { BaggageSubCategory } from "../../records/Baggage";

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

export default function getIconFromCategory(
  category: BaggageSubCategory,
  size: IconSize,
  color: IconColor,
) {
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
}
