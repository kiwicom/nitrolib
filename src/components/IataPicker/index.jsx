// @flow strict
import * as React from "react";
import styled from "styled-components";
import FaPlane from "react-icons/lib/fa/plane";

import InputText from "../InputText";
import type { Change } from "../InputText";
import IconText from "../IconText";
import ClickOutside from "../ClickOutside";
import Text from "../Text";
import { Consumer as IntlConsumer } from "services/intl/context";
import { themeDefault } from "records/Theme";
import type { ThemeProps } from "records/Theme";
import AirportListData from "./AirportListData";

const Container = styled.div`
  position: relative;
`;

const ResultWrapper = styled.div`
  position: absolute;
  top: 74px;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 2;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.16), 0 1px 32px rgba(0, 0, 0, 0.32);
  background: ${({ theme }): ThemeProps => theme.orbit.paletteWhite};
`;

ResultWrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  id: string,
  value: string,
  onSelect: (value: string) => void,
  error: string,
  showState: boolean,
|};

type State = {|
  open: boolean,
|};

export default class IataPicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    showState: false,
  };

  state = {
    open: false,
  };

  handleChange = ({ value }: Change) => {
    const { onSelect } = this.props;

    onSelect(value);
  };

  handleSelect = (value: string) => {
    const { onSelect } = this.props;

    this.setState({ open: false });
    onSelect(value);
  };

  handleFocus = () => {
    this.setState({ open: true });
  };

  handleKeyDown = (ev: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Tab") {
      this.setState({ open: false });
    }
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  render() {
    const { id, value, error, showState } = this.props;
    const { open } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <ClickOutside onClickOutside={this.handleClickOutside}>
            <Container>
              <IconText Icon={FaPlane}>
                <Text t={__("common.iata_code")} />
              </IconText>
              <InputText
                id={id}
                value={value}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                placeholder={intl.translate(__("common.iata_airport_placeholder"))}
                error={intl.translate(error)}
                showState={showState}
              />
              {open &&
                value !== "" && (
                  <ResultWrapper>
                    <AirportListData value={value} onSelect={this.handleSelect} />
                  </ResultWrapper>
                )}
            </Container>
          </ClickOutside>
        )}
      </IntlConsumer>
    );
  }
}
