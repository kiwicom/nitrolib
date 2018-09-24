// @flow strict
import * as React from "react";
import * as R from "ramda";
import Exchange from "@kiwicom/orbit-components/lib/icons/Exchange";

import { getCode, getSymbol } from "../../records/Currency";
import type { Currency } from "../../records/Currency";
import NativeGroupedSelect from "../NativeGroupedSelect";

const mapCurrencies = R.map(currency => ({
  value: currency.id,
  text: `${getCode(currency.id)} - ${getSymbol(currency.format)}`,
}));

type Props = {|
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onChange: (code: string) => void,
  onOpen: () => void,
|};

const NativePicker = ({ current, available, recommended, onChange, onOpen }: Props) => (
  <NativeGroupedSelect
    value={current.id}
    groups={[
      { key: "current", items: mapCurrencies([current]) },
      { key: "recommended", items: mapCurrencies(recommended) },
      { key: "all", items: mapCurrencies(available) },
    ]}
    icon={<Exchange className="CurrencySwitcher-icon" size="small" />}
    onChange={onChange}
    onOpen={onOpen}
  />
);

export default NativePicker;
