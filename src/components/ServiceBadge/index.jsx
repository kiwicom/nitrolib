// @flow
import * as React from "react";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import StarFull from "@kiwicom/orbit-components/lib/icons/StarFull";
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";

import Text from "../Text";

type Props = {|
  premium?: boolean,
|};

const ServiceBadge = ({ premium }: Props) => (
  <Badge
    type={premium ? "dark" : "neutral"}
    icon={premium ? <StarFull customColor="#f9971e" /> : <Plus customColor="#0176d2" />}
  >
    {premium ? (
      <Text t="booking.service_packages.premium" type="white" size="small" />
    ) : (
      <Text t="booking.service_packages.plus" size="small" />
    )}
  </Badge>
);

export default ServiceBadge;
