// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import mq from "../../../styles/mediaQuery";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import ClickOutside from "../../ClickOutside";
import type { Currency } from "../../../records/Currency";
import Current from "./Current";
import Menu from "./Menu";

const Container = styled.div`
  ${mq.gtDesktop(css`
    position: relative;
  `)};
`;

const OpenButton = styled.div`
  cursor: pointer;

  ${Container}:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

OpenButton.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onChange: (code: string) => void,
|};

type State = {|
  shown: boolean,
|};

export default class CustomPicker extends React.Component<Props, State> {
  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({ shown: !state.shown }));
  };

  handleHide = () => {
    this.setState({ shown: false });
  };

  handleSetCurrency = (code: string) => {
    const { onChange } = this.props;
    this.setState({ shown: false });
    onChange(code);
  };

  render() {
    const { current, available, recommended } = this.props;
    const { shown } = this.state;

    return (
      <Container>
        <OpenButton onClick={this.handleToggle}>
          <Current currency={current} />
        </OpenButton>

        {shown && (
          <ClickOutside onClickOutside={this.handleHide}>
            <Menu
              current={current}
              available={available}
              recommended={recommended}
              onSetCurrency={this.handleSetCurrency}
            />
          </ClickOutside>
        )}
      </Container>
    );
  }
}
