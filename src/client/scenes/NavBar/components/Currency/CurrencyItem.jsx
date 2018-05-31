// @flow strict
import * as React from "react";

import getSymbol from "client/services/currency/getSymbol";
import type { Currency } from "client/records/Currency";

export const CLASS_CODE = "CurrencyItem-code";
export const CLASS_SIGN = "CurrencyItem-sign";
export const CLASS_NAME = "CurrencyItem-name";

type Props = {|
  currency: Currency,
  separatorSign?: React.Node,
  separatorName?: React.Node,
  showName: boolean,
|};

const CurrencyItem = (props: Props) => (
  <>
    <span className={CLASS_CODE}>{props.currency.id.toUpperCase()}</span>
    {props.separatorSign}
    <span className={CLASS_SIGN}>{getSymbol(props.currency)}</span>
    {props.showName && (
      <>
        {props.separatorName}
        <span className={CLASS_NAME}>{props.currency.name}</span>
      </>
    )}
  </>
);

CurrencyItem.defaultProps = {
  showName: false,
};

export default CurrencyItem;
