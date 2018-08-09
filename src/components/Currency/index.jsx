// @flow strict
import * as React from "react";

import * as currencyContext from "../../services/currency/context";
import NativePicker from "./NativePicker";
import CustomPicker from "./CustomPicker";
import getAvailableList from "./services/getAvailableList";

type Props = {|
  native: boolean,
  loadingContent: React.Node,
|};

const Currency = ({ native, loadingContent }: Props) => (
  <currencyContext.Consumer>
    {({ currency, available, recommended, setCurrency }) => {
      if (!currency) {
        return loadingContent;
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
  loadingContent: null,
};

export default Currency;
