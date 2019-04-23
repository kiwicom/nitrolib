// @flow strict
import React, { useContext } from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Price from "../../../Price";
import currencyContext from "../../../../services/currency/context";
import Translate from "../../../Translate";

type Props = {|
  totalPrice: number,
|};

const TotalPayment = ({ totalPrice }: Props) => {
  const { currency } = useContext(currencyContext);
  return (
    <Stack flex align="center" justify="between" dataTest="BaggagePaymentSummary-TotalPayment">
      <Stack inline align="center" spacing="tight">
        <Text>
          <Translate t="baggage_modal.payment.total" values={{ currency: currency.name }} />
        </Text>
        <InformationCircle size="small" color="secondary" />
      </Stack>
      <Text>
        <Price value={totalPrice} />
      </Text>
    </Stack>
  );
};

export default TotalPayment;
