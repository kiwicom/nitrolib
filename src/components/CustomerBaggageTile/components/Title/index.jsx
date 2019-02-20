// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import type { PriceType, Gender, OrderStatusType } from "../../../../records/Baggage";
import Badge from "./components/Badge";

type TitleProps = {
  firstName: string,
  lastName: string,
  gender: Gender,
  orderStatus: OrderStatusType,
  price?: PriceType,
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  ${mq.largeMobile(css`
    flex-direction: row;
    align-items: center;
  `)};
  svg {
    margin-right: 6px;
  }

  div {
    margin-top: 9px;
    margin-left: 28px;
    ${mq.largeMobile(css`
      margin-left: 10px;
    `)};
  }
`;

const PassengerName = styled.span`
  margin-right: 16px;
`;

const Title = ({ firstName, lastName, gender, orderStatus, price }: TitleProps) => (
  <TitleWrapper>
    <Stack inline align="center" spacing="condensed">
      {gender === "male" ? <GenderMan /> : <GenderWoman />}
      <PassengerName>{`${firstName} ${lastName}`}</PassengerName>
    </Stack>
    <Badge orderStatus={orderStatus} price={price} />
  </TitleWrapper>
);

export default Title;
