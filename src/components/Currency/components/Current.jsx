// @flow strict
import * as React from "react";

import { getCode, getSymbol } from "../../../records/Currency";
import type { Currency } from "../../../records/Currency";
import Code from "./Code";
import Sign from "./Sign";

type Props = {|
  current: Currency,
|};

const Current = ({ current }: Props) => (
  <>
    <Code>{getCode(current.id)}</Code>
    {" - "}
    <Sign>{getSymbol(current.format)}</Sign>
  </>
);

export default Current;
