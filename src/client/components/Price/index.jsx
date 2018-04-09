/* @flow */
import * as React from "react";

import format from "client/services/currency/format";
import { Consumer } from "client/services/currency/context";

type Props = {
  value: number,
};

const Price = (props: Props) => <Consumer>{curr => format(curr, props.value)}</Consumer>;

export default Price;
