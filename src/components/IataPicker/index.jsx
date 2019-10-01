// @flow strict
import * as React from "react";
import styled from "styled-components";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ClickOutside from "@kiwicom/orbit-components/lib/ClickOutside";

import IconText from "../IconText";
import Translate from "../Translate";
import type { Change } from "../InputText";
import { Consumer as IntlConsumer } from "../../services/intl/context";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import AirportListData from "./AirportListData";

const Container = styled.div`
  position: relative;
`;

const ResultWrapper = styled.div`
  position: absolute;
  top: 74px;
  ${left}: 0;
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
  withIcon: boolean,
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

  static defaultProps = {
    withIcon: true,
  };

  handleChange = ({ value }: Change) => {
    const { onSelect } = this.props;

    onSelect(value);
  };

  handleInputChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
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
    const { id, value, error, withIcon } = this.props;
    const { open } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <ClickOutside onClickOutside={this.handleClickOutside}>
            <Container data-test="IATAPicker">
              <InputField
                id={id}
                value={value}
                onChange={this.handleInputChange}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                label={
                  withIcon ? (
                    <IconText icon={<Airplane color="primary" size="small" />}>
                      <Translate t="common.iata_code" />
                    </IconText>
                  ) : (
                    <Translate t="common.iata_code" />
                  )
                }
                placeholder={intl.translate(__("account.iata_placeholder"))}
                help={value && intl.translate(__("account.iata_help"))}
                error={value && intl.translate(error)}
              />
              {open && value !== "" && (
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
