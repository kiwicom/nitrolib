// @flow strict
import * as React from "react";
import styled from "styled-components";
import FaPlane from "react-icons/lib/fa/plane";

import InputText from "client/components/InputText/index";
import IconText from "client/components/IconText/index";
import ClickOutside from "client/components/ClickOutside/index";
import Text from "client/components/Text";
import { Consumer as IntlConsumer } from "client/services/intl/context";
import { brandDefault } from "../../public/records/Brand";
import type { ThemeProps } from "../../public/records/Brand";
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
  background: ${({ theme }): ThemeProps => theme.colors.white};
`;

ResultWrapper.defaultProps = {
  theme: brandDefault.theme,
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
