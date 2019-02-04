// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import type { Price, Gender, OrderStatusType } from "../../../../records/Baggage";
import mq from "../../../../styles/mq";
import Badge from "./components/Badge";

type TitleProps = {
  firstName: string,
  lastName: string,
  gender: Gender,
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
