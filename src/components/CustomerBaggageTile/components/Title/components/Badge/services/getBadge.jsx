// @flow strict
import React from "react";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";

import { Consumer } from "../../../../../../../services/currency/context";
import { format } from "../../../../../../../records/Currency";
import type { OrderStatusType } from "../../../../../../../records/Baggage";
import Translate from "../../../../../../Translate";

export default function getBadge(status: OrderStatusType, price: ?number) {
  switch (status) {
    case "unpaid":
      return (
        <Badge
          type="warning"
          icon={<Money size="small" dataTest={`CustomerBaggageTile-Badge-${status}`} />}
        >
          <Consumer>
            {({ currency }) =>
              typeof price === "number" && (
                <Translate
                  t="baggage_modal.badge.unpaid"
                  values={{ price: format(currency, price) }}
                />
              )
            }
          </Consumer>
        </Badge>
      );
    case "processing":
      return (
        <Badge type="info" icon={<Reload />} dataTest={`CustomerBaggageTile-Badge-${status}`}>
          <Translate t="baggage_modal.badge.processing" />
        </Badge>
      );
    case "notAvailable":
      return (
        <Badge type="neutral" dataTest={`CustomerBaggageTile-Badge-${status}`}>
          <Translate t="baggage_modal.badge.not_available" />
        </Badge>
      );
    default:
      return null;
  }
}
