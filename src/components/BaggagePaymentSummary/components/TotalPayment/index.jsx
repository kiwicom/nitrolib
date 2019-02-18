// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";

import Price from "../../../Price";
import { Consumer } from "../../../../services/currency/context";
import Translate from "../../../Translate";

type Props = {
  totalPrice: number,
};

const TotalPayment = ({ totalPrice }: Props) => (
  <Stack justify="between">
    <Text>
      <Translate t="common.baggage.payment.total" />
      <Consumer>{({ currency }) => ` (${currency.name}) `}</Consumer>
      <InformationCircle size="small" color="secondary" />
    </Text>
    <Text>
      <Price value={totalPrice} />
    </Text>
  </Stack>
);

export default TotalPayment;
