// @flow strict
import * as React from "react";
import styled from "styled-components";

import { getCode, getSymbol } from "../../../records/Currency";
import type { Currency } from "../../../records/Currency";
import Code from "./Code";
import Sign from "./Sign";

const Separator = styled.span`
  margin: 0 3px;
`;

type Props = {|
  current: Currency,
|};

const Current = ({ current }: Props) => (
  <>
    <Code>{getCode(current.id)}</Code>
    <Separator>-</Separator>
    <Sign>{getSymbol(current.format)}</Sign>
  </>
);

export default Current;
