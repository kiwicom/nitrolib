// @flow
import * as React from "react";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import { Consumer } from "../../../../../../services/currency/context";
import { format } from "../../../../../../records/Currency";
import type { OrderStatusType } from "../../../../../../records/Baggage";
import type { PriceType } from "../../../../../../records/Price";
import Translate from "../../../../../Translate/index";

const getTooltipText = (status: OrderStatusType) => {
  switch (status) {
    case "unpaid":
      return <Translate t="baggage_modal.tooltip.unpaid" />;
    case "processing":
      return <Translate t="baggage_modal.tooltip.processing" />;
    default:
      return <Translate t="baggage_modal.tooltip.not_available" />;
  }
};

const getBadge = (status: OrderStatusType, price?: PriceType) => {
  switch (status) {
    case "unpaid":
      return (
        <Badge type="warning">
          <Money size="small" />
          <Consumer>
            {({ currency }) => (
              <Translate
                t="baggage_modal.badge.unpaid"
                values={{ price: price ? format(currency, price.amount) : "" }}
              />
            )}
          </Consumer>
        </Badge>
      );
    case "processing":
      return (
        <Badge type="info">
          <Reload size="small" />
          <Translate t="baggage_modal.badge.processing" />
        </Badge>
      );
    case "notAvailable":
      return (
        <Badge type="dark">
          <Alert size="small" />
          <Translate t="baggage_modal.badge.not_available" />
        </Badge>
      );
    default:
      return undefined;
  }
};

type TitleBadgeProps = {
  orderStatus: "unpaid" | "processing" | "notAvailable",
  price?: PriceType,
};

const TitleBadge = ({ orderStatus, price }: TitleBadgeProps) => (
  <Tooltip content={getTooltipText(orderStatus)} preferredPosition="top" size="small">
    <>{getBadge(orderStatus, price)}</>
  </Tooltip>
);

export default TitleBadge;
