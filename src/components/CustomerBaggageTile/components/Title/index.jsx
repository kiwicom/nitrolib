// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Gender, OrderStatusType } from "../../../../records/Baggage";
import Badge from "./components/Badge";

type TitleProps = {|
  firstName: string,
  middleName?: string,
  lastName: string,
  gender: Gender,
  dayOfBirth?: string,
  orderStatus: ?OrderStatusType,
  price: ?number,
|};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mq.largeMobile(css`
    flex-direction: row;
    align-items: center;
  `)};

  svg {
    display: "inline";
  }

  > span {
    margin-left: 28px;
    ${mq.largeMobile(css`
      margin-left: 10px;
    `)};
  }
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
  <Wrapper data-test="CustomerBaggageTile-Title">
    <Stack inline align="center" spacing="condensed">
      {gender === "male" ? <GenderMan /> : <GenderWoman />}
      <Text element="span" weight="bold" size="large">{`${firstName}
        ${middleName ? `${middleName}` : ""}
        ${lastName}${dayOfBirth ? ` ${dayOfBirth}` : ""}`}</Text>
    </Stack>
    {orderStatus && <Badge orderStatus={orderStatus} price={price} />}
  </Wrapper>
);

export default Title;
