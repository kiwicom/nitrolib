import * as React from "react";
import * as R from "ramda";
import Exchange from "@kiwicom/orbit-components/lib/icons/Exchange";

import { getCode, getSymbol } from "../../../../records/Currency";
import { Currency } from "../../../../records/Currency";
import NativeGroupedSelect from "../../../NativeGroupedSelect";

const mapCurrencies = R.map(currency => ({
  value: currency.id,
  text: `${getCode(currency.id)} - ${getSymbol(currency.format.format)}`,
}));

type Props = {
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onChange: (code: string) => void,
};

const NativePicker = ({ current, available, recommended, onChange }: Props) => (
  <NativeGroupedSelect
    value={current.id}
    groups={[
      {
        key: "current",
        items: [
          {
            value: current.id,
            text: `${getCode(current.id)} - ${getSymbol(current.format.format)}`,
          },
        ],
      },
      { key: "recommended", items: mapCurrencies(recommended) },
      { key: "all", items: mapCurrencies(available) },
    ]}
    icon={<Exchange className="CurrencySwitcher-icon" size="small" />}
    onChange={onChange}
  />
);

export default NativePicker;
