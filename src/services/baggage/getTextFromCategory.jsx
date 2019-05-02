// @flow
import * as React from "react";

import type { BaggageSubCategory } from "../../records/Baggage";
import Translate from "../../components/Translate/index";

export default function getTextFromCategory(
  category: BaggageSubCategory,
  transform?: (value: string) => string,
): React$Node {
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
}
