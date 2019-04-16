// @flow strict
import * as R from "ramda";

import type { BaggageCategory, OptionBaggage } from "../../../records/Baggage";

type GetPersonalItemPresenceArgs = {
  pickerType: BaggageCategory,
  options: OptionBaggage[],
};

export default function getPersonalItemPresence({
  pickerType,
  options,
}: GetPersonalItemPresenceArgs): boolean {
  if (pickerType === "holdBag") return false;
  return options
    .reduce((acc, option) => {
      const items = R.values(option.items).map(item => item.category);
      return [...acc, ...items];
    }, [])
    .some(i => i === "personalItem");
}
