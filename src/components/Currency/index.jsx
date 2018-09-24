// @flow strict
import * as React from "react";

import { Consumer as CurrencyConsumer } from "../../services/currency/context";
import NativePicker from "./NativePicker";
import CustomPicker from "../CustomPicker";
import { getAvailableList } from "../../records/Currency";
import Current from "./components/Current";
import Menu from "./components/Menu";
import type { Event } from "../../records/Event";

type Props = {|
  native: boolean,
  loading: React.Node,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  onLog: (event: Event<"openCurrency", {}>) => void,
|};

export default class Currency extends React.PureComponent<Props> {
  static defaultProps = {
    native: false,
    loading: null,
  };

  handleOpen = () => {
    const { onLog } = this.props;

    onLog({ event: "openCurrency", data: {} });
  };

  render() {
    const { native, loading, positionMenuDesktop, positionMenuTablet } = this.props;

    return (
      <CurrencyConsumer>
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
              onOpen={this.handleOpen}
            />
          ) : (
            <CustomPicker
              onChange={onChange}
              onOpen={this.handleOpen}
              openButton={<Current current={currency} />}
            >
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
      </CurrencyConsumer>
    );
  }
}
