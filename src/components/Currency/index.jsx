// @flow strict
import * as React from "react";

import { Consumer as CurrencyConsumer } from "../../services/currency/context";
import NativePicker from "./components/NativePicker";
import CustomPicker from "../CustomPicker";
import { currencyDefault, getAvailableList } from "../../records/Currency";
import Current from "./components/Current";
import Menu from "./components/Menu";
import LogMount from "../LogMount";
import type { Modal as ModalType } from "../../consts/modals";
import { CURRENCY_OPEN } from "./consts/events";

type Props = {|
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  inverted?: boolean,
  onSetModal?: (modal: ModalType) => void,
  // defaulted
  native: boolean,
  loading: React.Node,
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
      return (
        <section data-test="Currency">
          {native ? (
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
            >
              {render => (
                <>
                  <LogMount event={CURRENCY_OPEN} />
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
          )}
        </section>
      );
    }}
  </CurrencyConsumer>
);

Currency.defaultProps = {
  native: false,
  loading: null,
};

export default Currency;
