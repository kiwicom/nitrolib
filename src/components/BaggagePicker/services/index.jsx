// @flow strict
import * as React from "react";
import R from "ramda";

import type { BaggageCategory, OptionBaggage } from "../../../records/Baggage";
import Translate from "../../Translate/index";

export const getTitle = (type: string): React$Node =>
  type === "handBag" ? (
    <Translate t="baggage_modal.subheader.cabin_baggage" />
  ) : (
    <Translate t="baggage_modal.subheader.checked_baggage" />
  );

export const getTooltip = (type: string): React$Node =>
  type === "handBag" ? (
    <Translate t="baggage_modal.tooltip.cabin_baggage" />
  ) : (
    <Translate t="baggage_modal.tooltip.checked_baggage" />
  );

export const getEmptyOptionText = (type: string): React$Node =>
  type === "handBag" ? (
    <Translate t="baggage_modal.error.cabin_baggage_not_available" />
  ) : (
    <Translate t="baggage_modal.error.checked_baggage_not_available" />
  );

type GetPersonalItemPresenceType = {
  pickerType: BaggageCategory,
  options: OptionBaggage[],
};

export const getPersonalItemPresence = ({
  pickerType,
  options,
}: GetPersonalItemPresenceType): boolean => {
  if (pickerType === "holdBag") return false;
  return options
    .reduce((acc, option) => {
      const items = R.values(option.items).map(item => item.category);
      return [...acc, ...items];
    }, [])
    .some(i => i === "personalItem");
};
