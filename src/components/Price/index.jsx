// @flow strict
import * as React from "react";

import { Consumer } from "services/currency/context";
import { format } from "records/Currency";

type Props = {|
  value: number,
|};

const Price = (props: Props) => (
  <Consumer>{({ currency }) => format(currency, props.value)}</Consumer>
);

export default Price;
