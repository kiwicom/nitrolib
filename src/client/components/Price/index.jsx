// @flow strict
import * as React from "react";

import { format } from "client/records/Currency";
import { Consumer } from "client/services/currency/context";

type Props = {
  value: number,
};

const Price = (props: Props) => (
  <Consumer>{({ currency }) => format(currency, props.value)}</Consumer>
);

export default Price;
