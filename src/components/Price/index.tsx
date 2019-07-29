import * as React from "react";

import { Consumer } from "../../services/currency/context";
import { format } from "../../records/Currency";

type Props = {
  value: number,
};

const Price = ({ value }: Props) => (
  <Consumer>{({ currency }) => format(currency, value)}</Consumer>
);

export default Price;
