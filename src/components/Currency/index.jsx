// @flow strict
import * as React from "react";

import * as currencyContext from "../../services/currency/context";
import NativePicker from "./NativePicker";
import CustomPicker from "./components/CustomPicker";
import { getAvailableList } from "../../records/Currency";

type Props = {|
  native: boolean,
  loading: React.Node,
|};

const Currency = ({ native, loading }: Props) => (
  <currencyContext.Consumer>
    {({ currency, available, recommended, setCurrency }) => {
      if (!currency) {
        return loading;
      }

      const availableList = getAvailableList(available);

      return native ? (
        <NativePicker
          current={currency}
          available={availableList}
          recommended={recommended}
          onChange={setCurrency}
        />
      ) : (
        <CustomPicker
          current={currency}
          available={availableList}
          recommended={recommended}
          onChange={setCurrency}
        />
      );
    }}
  </currencyContext.Consumer>
);

Currency.defaultProps = {
  native: false,
  loading: null,
};

export default Currency;
