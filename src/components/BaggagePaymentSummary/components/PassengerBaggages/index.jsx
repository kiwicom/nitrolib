// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import Price from "../../../Price";
import { getTextFromCategory } from "../../../../services/baggage/utils";
import type { Item } from "../../../../records/Baggage";

type Props = {
  firstName: string,
  lastName: string,
  baggage: {
    handBag: Array<Item>,
    holdBag: Array<Item>,
  },
  price: number,
};

const PassengerBaggages = ({ firstName, lastName, baggage, price }: Props) => (
  <Stack spaceAfter="medium" spacing="tight">
    <Stack flex justify="between">
      <Text>
        Baggage for
        {` ${firstName} ${lastName}`}
      </Text>
      <Text>
        <Price value={price} />
      </Text>
    </Stack>
    <Stack spacing="tight">
      {baggage.handBag.map((bag, index) => (
        <Stack key={index} /* eslint-disable-line */>
          <Text type="secondary" element="span">
            {`${bag.amount}x `}
            {getTextFromCategory(bag.category)}
          </Text>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default PassengerBaggages;
