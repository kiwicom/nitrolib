// @flow strict
import * as React from "react";

import { format } from "client/public/records/Currency";
import { Consumer } from "client/public/services/currency/context";

type Props = {
  value: number,
};

const Price = (props: Props) => (
  <Consumer>{({ currency }) => format(currency, props.value)}</Consumer>
);

export default Price;
