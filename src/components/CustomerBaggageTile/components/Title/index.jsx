// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Text from "@kiwicom/orbit-components/lib/Text";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import type { OrderStatusType } from "../../../../records/Baggage";
import Badge from "./components/Badge";
import { themeDefault } from "../../../../records/Theme";

type TitleProps = {|
  firstName: string,
  middleName?: string,
  lastName: string,
  icon: React.Node,
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
    margin-${/* sc-custom "left" */ left}: 28px;
    margin-top: 6px;
    ${mq.largeMobile(css`
      margin-${/* sc-custom "left" */ left}: 10px;
      margin-top: 0;
    `)};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const Title = ({
  firstName,
  middleName,
  lastName,
  icon,
  dayOfBirth,
  orderStatus,
  price,
}: TitleProps) => (
  <Wrapper data-test="CustomerBaggageTile-Title">
    <Stack inline mobileMedium={{ align: "center" }} align="start" spacing="condensed">
      {icon}
      <Text element="span" weight="bold" size="large">
        {`${firstName}
        ${middleName ? `${middleName}` : ""}
        ${lastName}`}
      </Text>
      {dayOfBirth && (
        <Text element="span" weight="bold" size="large">
          {dayOfBirth}
        </Text>
      )}
    </Stack>
    {orderStatus && <Badge orderStatus={orderStatus} price={price} />}
  </Wrapper>
);

export default Title;
