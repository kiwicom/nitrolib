// @flow
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";

import Price from "../../../Price";
import { Consumer } from "../../../../services/currency/context";
import Translate from "../../../Translate";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";

type Props = {
  totalPrice: number,
};

const Wrapper = styled.div.attrs({
  "data-test": "BaggagePaymentSummary-TotalPayment",
})`
  display: flex;
  justify-content: space-between;
  svg {
    margin-left: ${({ theme }: ThemeProps) => theme.orbit.spaceXXSmall};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const TotalPayment = ({ totalPrice }: Props) => (
  <Wrapper>
    <Text>
      <Consumer>
        {({ currency }) => (
          <Translate t="baggage_modal.payment.total" values={{ currency: currency.name }} />
        )}
      </Consumer>
      <InformationCircle size="small" color="secondary" />
    </Text>
    <Text>
      <Price value={totalPrice} />
    </Text>
  </Wrapper>
);

export default TotalPayment;
