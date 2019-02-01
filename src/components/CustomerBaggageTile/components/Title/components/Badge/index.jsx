// @flow
import * as React from "react";
import styled from "styled-components";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";

import type { Price } from "../../../../../../records/Baggage";
import Tooltip from "../../../../../Tooltip/index";

const TooltipContent = styled.p`
  width: 240px;
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 rgba(23, 27, 30, 0.3);
  line-height: 1.33;
  font-size: 12px;
  padding: 9px 11px;
`;

const getTooltipText = status => {
  switch (status) {
    case "unpaid":
      return "This passenger's baggage bundle will be updated when you finish the payment.";
    case "processing":
      return "We're currently processing your baggage order. You'll be able to add more when we finish.";

    case "notAvailable":
      return "We are sorry, but something went wrong. To add a baggage to your trip, please contact our customer service. ";
    default:
      return undefined;
  }
};

const getBadge = (status, price) => {
  switch (status) {
    case "unpaid":
      return (
        <Badge type="warning">
          <Money size="small" />
          Unpaid changes for {price && `${price.amount} ${price.currency}`}
        </Badge>
      );
    case "processing":
      return (
        <Badge type="info">
          <Reload size="small" />
          Processing changes
        </Badge>
      );
    case "notAvailable":
      return (
        <Badge type="dark">
          <Alert size="small" />
          Online ordering not available
        </Badge>
      );
    default:
      return undefined;
  }
};

type TitleBadgeProps = {
  orderStatus: "unpaid" | "processing" | "notAvailable",
  price: Price,
};

const TitleBadge = ({ orderStatus, price }: TitleBadgeProps) => (
  <Tooltip tip={<TooltipContent>{getTooltipText(orderStatus)}</TooltipContent>} position="top">
    <>{getBadge(orderStatus, price)}</>
  </Tooltip>
);

export default TitleBadge;
