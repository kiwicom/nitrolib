// @flow strict
import * as React from "react";

import Translate from "../../Translate/index";

export default function getTooltip(type: string): React$Node {
  return type === "handBag" ? (
    <Translate t="baggage_modal.tooltip.cabin_baggage" />
  ) : (
    <Translate t="baggage_modal.tooltip.checked_baggage" />
  );
}
