// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import Money from "@kiwicom/orbit-components/lib/icons/Money";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import Reload from "@kiwicom/orbit-components/lib/icons/Reload";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import type { Price } from "../../../../records/Baggage";
import mq from "../../../../styles/mq";

type OrderStatusType = "unpaid" | "processing" | "notAvailable";
type TitleProps = {
  firstName: string,
  lastName: string,
  gender: "male" | "female",
  orderStatus: OrderStatusType,
  price?: Price,
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  ${mq.ltBigMobile(css`
    align-items: flex-start;

    flex-direction: column;
  `)};
  svg {
    margin-right: 6px;
  }

  div {
    margin-left: 10px;
    ${mq.ltBigMobile(css`
      margin-top: 9px;
      margin-left: 28px;
    `)};
  }
`;

const PassengerName = styled.span`
  margin-right: 16px;
`;

const Title = ({ firstName, lastName, gender, orderStatus, price }: TitleProps) => {
  const getBadge = () => {
    switch (orderStatus) {
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
  return (
    <TitleWrapper>
      <Stack inline align="center" spacing="condensed">
        {gender === "male" ? <GenderMan /> : <GenderWoman />}
        <PassengerName>{`${firstName} ${lastName}`}</PassengerName>
      </Stack>
      {getBadge()}
    </TitleWrapper>
  );
};

export default Title;
