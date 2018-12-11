// @flow strict
import * as React from "react";

import { Consumer as CurrencyConsumer } from "../../services/currency/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import { currencyDefault, getAvailableList } from "../../records/Currency";
import Current from "./components/Current";
import Menu from "./components/Menu";
import LogMount from "../LogMount";
import { OPEN_CURRENCY } from "../../consts/events";
import type { Modal as ModalType } from "../../consts/modals";

type Props = {|
  native: boolean,
  loading: React.Node,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  inverted?: boolean,
  onSetModal?: (modal: ModalType) => void,
|};

const Currency = ({
  native,
  loading,
  positionMenuDesktop,
  positionMenuTablet,
  inverted,
  onSetModal,
}: Props) => (
  <CurrencyConsumer>
    {({ currency, available, recommended, onChange }) => {
      if (currency === currencyDefault) {
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
        <CustomPicker
          onChange={onChange}
          openButton={<Current current={currency} inverted={inverted} />}
          dataTest="CurrencySwitcher"
        >
          {render => (
            <>
              <LogMount event={{ event: OPEN_CURRENCY, data: null }} />
              <Menu
                onChange={render.onChange}
                current={currency}
                available={availableList}
                recommended={recommended}
                positionMenuDesktop={positionMenuDesktop}
                positionMenuTablet={positionMenuTablet}
                onSetModal={onSetModal}
              />
            </>
          )}
        </CustomPicker>
      );
    }}
  </CurrencyConsumer>
);

Currency.defaultProps = {
  native: false,
  loading: null,
};

export default Currency;
