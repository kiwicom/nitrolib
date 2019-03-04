// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import type { Gender, OrderStatusType } from "../../../../records/Baggage";
import Badge from "./components/Badge";

type TitleProps = {
  firstName: string,
  middleName?: string,
  lastName: string,
  gender: Gender,
  dayOfBirth?: string,
  orderStatus: OrderStatusType,
  price?: number,
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

const Title = ({
  firstName,
  middleName,
  lastName,
  gender,
  dayOfBirth,
  orderStatus,
  price,
}: TitleProps) => (
  <TitleWrapper>
    <Stack inline align="center" spacing="condensed">
      {gender === "male" ? <GenderMan /> : <GenderWoman />}
      <PassengerName>{`${firstName} ${
        middleName ? `${middleName[0]}.` : ""
      } ${lastName}`}</PassengerName>
    </Stack>
    <Badge orderStatus={orderStatus} price={price} />
    {dayOfBirth && (
      <Stack inline align="center" spacing="condensed">
        <Text size="small" type="secondary" element="span">
          {dayOfBirth}
        </Text>
      </Stack>
    )}
  </TitleWrapper>
);

export default Title;
