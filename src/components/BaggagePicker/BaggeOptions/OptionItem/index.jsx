// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Price, Restrictions } from "../../../../records/Baggage";

type Props = {|
  holdBag: boolean,
  amount: number,
  restrictions: Restrictions,
  firstItem: boolean,
  price: Price,
  categoryIcon: React$Element<any>,
  categoryName: string,
  baggageSize: string,
|};

const OptionItem = ({
  firstItem,
  amount,
  restrictions,
  holdBag,
  price,
  baggageSize,
  categoryIcon,
  categoryName,
}: Props) => (
  <Stack shrink spacing="natural" align="center">
    <Stack shrink align="center" spacing="condensed">
      {categoryIcon}
      <Text>
        {amount > 1 && (
          <Text element="span" weight="bold">
            {`${amount}x `}
          </Text>
        )}
        {holdBag && `${restrictions.weight}kg`} {categoryName}
      </Text>
    </Stack>
    <Stack shrink align="center" justify="between" spacing="tight">
      <Text type="secondary">{baggageSize}</Text>
      {firstItem ? <Text weight="bold">{`${price.amount} ${price.currency}`}</Text> : <span />}
    </Stack>
  </Stack>
);

export default OptionItem;
