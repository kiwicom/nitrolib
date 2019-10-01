// @flow strict
import * as React from "react";
import styled from "styled-components";

import { Consumer as CurrencyConsumer } from "../../services/currency/context";
import NativePicker from "./components/NativePicker";
import CustomPicker from "../CustomPicker";
import { currencyDefault, getAvailableList, getCode, getSymbol } from "../../records/Currency";
import Code from "./primitives/Code";
import Sign from "./primitives/Sign";
import Menu from "./components/Menu";
import LogMount from "../LogMount";
import type { Modal as ModalType } from "../../consts/modals";
import { CURRENCY_OPEN } from "./consts/events";

const Separator = styled.span`
  margin: 0 3px;
`;

type Props = {|
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
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
              dataTest="Currency-Open"
              text={
                <>
                  <Code>{getCode(currency.id)}</Code>
                  <Separator>-</Separator>
                  <Sign>{getSymbol(currency.format.format)}</Sign>
                </>
              }
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
