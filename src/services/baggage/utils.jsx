// @flow
import * as React from "react";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Close from "@kiwicom/orbit-components/lib/icons/Close";

import Translate from "../../components/Translate/index";

export const getTextFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <Translate t="common.baggage.personal_item" />;
    case "cabinBag":
      return <Translate t="common.baggage.cabin_bag" />;
    case "holdBag":
      return <Translate t="common.baggage.checked_bag" />;
    default:
      return <Translate t="common.baggage.no_checked_baggage" />;
  }
};

export const getIconFromCategory = (category, size, color) => {
  switch (category) {
    case "personalItem":
      return <BaggagePersonalItem size={size} color={color} />;
    case "cabinBag":
      return <BaggageCabin size={size} color={color} />;
    case "holdBag":
      return <BaggageChecked size={size} color={color} />;
    default:
      return <Close size={size} color={color} />;
  }
};
