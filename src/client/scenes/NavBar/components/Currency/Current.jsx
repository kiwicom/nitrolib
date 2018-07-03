// @flow strict
import * as React from "react";

import { getCode, getSymbol } from "client/records/Currency";
import type { Currency } from "client/records/Currency";
import Code from "./Code";
import Sign from "./Sign";

type Props = {|
  currency: Currency,
|};

const Current = ({ currency }: Props) => (
  <>
    <Code>{getCode(currency.id)}</Code>
    {" - "}
    <Sign>{getSymbol(currency.format)}</Sign>
  </>
);

export default Current;
