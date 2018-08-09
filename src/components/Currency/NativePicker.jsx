// @flow strict
import * as React from "react";
import styled from "styled-components";
import * as R from "ramda";
import { Exchange } from "@kiwicom/orbit-components/lib/icons";

import NativeGroupedSelect from "../NativeGroupedSelect";
import { getCode, getSymbol } from "../../records/Currency";
import type { Currency } from "../../records/Currency";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapCurrencies = R.map(currency => ({
  value: currency.id,
  text: `${getCode(currency.id)} - ${getSymbol(currency.format)}`,
}));

type Props = {|
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onChange: (code: string) => void,
|};

const NativePicker = ({ current, available, recommended, onChange }: Props) => (
  <Container>
    <NativeGroupedSelect
      value={current.id}
      groups={[
        { key: "current", items: mapCurrencies([current]) },
        { key: "recommended", items: mapCurrencies(recommended) },
        { key: "all", items: mapCurrencies(available) },
      ]}
      icon={<Exchange className="CurrencySwitcher-icon" size="small" />}
      onChange={onChange}
    />
  </Container>
);

export default NativePicker;
