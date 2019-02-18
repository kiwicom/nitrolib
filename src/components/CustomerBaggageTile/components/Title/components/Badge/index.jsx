// @flow
import * as React from "react";
import styled from "styled-components";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";

import { Consumer } from "../../../../../../services/currency/context";
import { format } from "../../../../../../records/Currency";
import type { PriceType, OrderStatusType } from "../../../../../../records/Baggage";
import Tooltip from "../../../../../Tooltip/index";
import Translate from "../../../../../Translate/index";

const TooltipContent = styled.p`
  width: 240px;
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 rgba(23, 27, 30, 0.3);
  line-height: 1.33;
  font-size: 12px;
  padding: 9px 11px;
`;

const getTooltipText = (status: OrderStatusType) => {
  switch (status) {
    case "unpaid":
      return <Translate t="common.baggage.tooltip.unpaid" />;
    case "processing":
      return <Translate t="common.baggage.tooltip.processing" />;
    case "notAvailable":
      return <Translate t="common.baggage.tooltip.notAvailable" />;
    default:
      return undefined;
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
                t="common.baggage.badge.unpaid"
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
          <Translate t="common.baggage.badge.processing" />
        </Badge>
      );
    case "notAvailable":
      return (
        <Badge type="dark">
          <Alert size="small" />
          <Translate t="common.baggage.badge.notAvailable" />
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
  <Tooltip tip={<TooltipContent>{getTooltipText(orderStatus)}</TooltipContent>} position="top">
    <>{getBadge(orderStatus, price)}</>
  </Tooltip>
);

export default TitleBadge;
