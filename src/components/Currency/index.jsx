// @flow strict
import * as React from "react";

import * as currencyContext from "../../services/currency/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import { getAvailableList } from "../../records/Currency";
import Current from "./components/Current";
import Menu from "./components/Menu";

type Props = {|
  native: boolean,
  loading: React.Node,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
|};

const Currency = ({ native, loading, positionMenuDesktop, positionMenuTablet }: Props) => (
  <currencyContext.Consumer>
    {({ currency, available, recommended, onChange }) => {
      if (!currency) {
        return loading;
      }

      const availableList = getAvailableList(available);

      return native ? (
        <NativePicker
          current={currency}
          available={availableList}
          recommended={recommended}
          onChange={onChange}
        />
      ) : (
        <CustomPicker onChange={onChange} openButton={<Current current={currency} />}>
          {render => (
            <Menu
              onChange={render.onChange}
              current={currency}
              available={availableList}
              recommended={recommended}
              positionMenuDesktop={positionMenuDesktop}
              positionMenuTablet={positionMenuTablet}
            />
          )}
        </CustomPicker>
      );
    }}
  </currencyContext.Consumer>
);

Currency.defaultProps = {
  native: false,
  loading: null,
};

export default Currency;
