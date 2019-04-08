// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import Price from "../../../Price";
import { getTextFromCategory } from "../../../../services/baggage/utils";
import type { ItemType } from "../../../../records/Baggage";
import Translate from "../../../Translate";

type Props = {
  paxId: number,
  firstName: string,
  lastName: string,
  baggage: {
    handBag: ItemType[],
    holdBag: ItemType[],
  },
  price: number,
};

const PassengerBaggages = ({ paxId, firstName, lastName, baggage, price }: Props) => (
  <Stack
    spaceAfter="medium"
    spacing="tight"
    dataTest={`BaggagePaymentSummary-PassengerBaggages-${paxId}`}
  >
    <Stack flex justify="between">
      <Text>
        <Translate t="baggage_modal.summary.baggage_for" values={{ firstName, lastName }} />
      </Text>
      <Text dataTest={`PassengerBaggages-${paxId}-Price`}>
        <Price value={price} />
      </Text>
    </Stack>
    <Stack spacing="tight">
      {baggage.handBag.map((bag: ItemType, index) => (
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
