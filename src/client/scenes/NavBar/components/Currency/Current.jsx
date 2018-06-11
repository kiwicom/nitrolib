// @flow strict
import * as React from "react";

import { getCode, getSymbol } from "client/records/Currency";
import type { Currency } from "client/records/Currency";
import Code from "./Code";
import Sign from "./Sign";

type Props = {|
  currency: Currency,
|};

const Current = (props: Props) => (
  <>
    <Code>{getCode(props.currency.id)}</Code>
    {" - "}
    <Sign>{getSymbol(props.currency.format)}</Sign>
  </>
);

export default Current;
