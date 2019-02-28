// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import Price from "../../../Price";
import { getTextFromCategory } from "../../../../services/baggage/utils";
import type { ItemType } from "../../../../records/Baggage";
import Translate from "../../../Translate";

type Props = {
  firstName: string,
  lastName: string,
  baggage: {
    handBag: Array<ItemType>,
    holdBag: Array<ItemType>,
  },
  price: number,
};

const PassengerBaggages = ({ firstName, lastName, baggage, price }: Props) => (
  <Stack spaceAfter="medium" spacing="tight">
    <Stack flex justify="between">
      <Text>
        <Translate t="baggage_modal.summary.baggage_for" values={{ firstName, lastName }} />
      </Text>
      <Text>
        <Price value={price} />
      </Text>
    </Stack>
    <Stack spacing="tight">
      {baggage.handBag.map((bag, index) => (
        <Stack key={index} /* eslint-disable-line */>
          <Text type="secondary" element="span">
            {`${bag.amount}× `}
            {getTextFromCategory(bag.category)}
          </Text>
        </Stack>
      ))}
      {baggage.holdBag.map((bag, index) => (
        <Stack key={index} /* eslint-disable-line */>
          <Text type="secondary" element="span">
            {`${bag.amount}× `}
            {getTextFromCategory(bag.category)}
          </Text>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default PassengerBaggages;
