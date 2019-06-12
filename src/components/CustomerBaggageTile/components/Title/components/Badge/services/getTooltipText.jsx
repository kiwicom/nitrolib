// @flow strict
import React from "react";

import type { OrderStatusType } from "../../../../../../../records/Baggage";
import Translate from "../../../../../../Translate";

export default function getTooltipText(status: OrderStatusType) {
  switch (status) {
    case "unpaid":
      return <Translate t="baggage_modal.tooltip.unpaid" />;
    case "processing":
      return <Translate t="baggage_modal.tooltip.processing" />;
    case "notAvailable":
      return <Translate t="baggage_modal.tooltip.not_available" />;
    default:
      return null;
  }
}
