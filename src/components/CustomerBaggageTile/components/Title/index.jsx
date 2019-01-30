// @flow strict
import * as React from "react";
import styled from "styled-components";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";

type TitleProps = {
  firstName: string,
  lastName: string,
  orderStatus: "unpaid" | "processing" | "notAvailable",
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 6px;
  }
`;

const PassengerName = styled.span`
  margin-right: 16px;
`;

const Title = ({ firstName, lastName, orderStatus }: TitleProps) => {
  const getBadge = status => {
    switch (status) {
      case "unpaid":
        return (
          <Badge type="warning">
            <Money size="small" />
            Unpaid changes for $28.24
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
        break;
    }
  };
  return (
    <TitleWrapper>
      <PassengerName>{`${firstName} ${lastName}`}</PassengerName>
      {getBadge(orderStatus)}
    </TitleWrapper>
  );
};

export default Title;
