// @flow strict
import * as React from "react";
import styled from "styled-components";
import FaPlane from "react-icons/lib/fa/plane";

import InputText from "client/components/InputText";
import IconText from "client/components/IconText";
import ClickOutside from "client/components/ClickOutside";
import Text from "client/components/Text";
import { Consumer as IntlConsumer } from "client/services/intl/context";
import AirportListData from "./AirportListData";

const ResultWrapper = styled.div`
  position: absolute;
  bottom: -300px;
  left: 0;
  width: 100%;
  height: 300px;
  overflow-y: scroll;
`;

type Props = {|
  id: string,
  value: string,
  onSelect: (value: string) => void,
  error: string,
|};

type State = {|
  open: boolean,
|};

export default class IataPicker extends React.PureComponent<Props, State> {
  state = {
    open: false,
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onSelect(ev.target.value);
  };

  handleSelect = (value: string) => {
    this.setState({ open: false });
    this.props.onSelect(value);
  };

  handleFocus = () => {
    this.setState({ open: true });
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  render() {
    const { id, value, error } = this.props;
    const { open } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <ClickOutside onClickOutside={this.handleClickOutside}>
            <InputText
              id={id}
              value={value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              placeholder={intl.translate(__("common.iata_airport_placeholder"))}
              label={
                <IconText Icon={FaPlane}>
                  <Text t={__("common.iata_code")} />
                </IconText>
              }
              error={intl.translate(error)}
            />
            {open &&
              value !== "" && (
                <ResultWrapper>
                  <AirportListData value={value} onSelect={this.handleSelect} />
                </ResultWrapper>
              )}
          </ClickOutside>
        )}
      </IntlConsumer>
    );
  }
}
