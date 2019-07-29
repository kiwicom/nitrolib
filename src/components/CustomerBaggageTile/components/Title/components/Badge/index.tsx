import * as React from "react";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import { OrderStatusType } from "../../../../../../records/Baggage";
import getTooltipText from "./services/getTooltipText";
import getBadge from "./services/getBadge";

type TitleBadgeProps = {
  orderStatus: OrderStatusType,
  price: ?number,
};

const TitleBadge = ({ orderStatus, price }: TitleBadgeProps) => (
  <Tooltip content={getTooltipText(orderStatus)} preferredPosition="top" size="small">
    <>{getBadge(orderStatus, price)}</>
  </Tooltip>
);

export default TitleBadge;
