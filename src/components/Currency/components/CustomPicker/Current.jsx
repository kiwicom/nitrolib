// @flow strict
import * as React from "react";

import { getCode, getSymbol } from "records/Currency";
import type { Currency } from "records/Currency";
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
