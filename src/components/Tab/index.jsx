// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { border } from "../../styles";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const shadowMixin = css`
  box-shadow: 0 0 3px 0 ${({ theme }: ThemeProps) => theme.orbit.paletteInkLighter} inset;
`;

const hoverMixin = css`
  cursor: pointer;

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  }
`;

type ContainerProps = ThemeProps & {
  active: boolean,
};

const Container = styled.button`
  flex: 1;
  margin: 0;
  padding: 0;
  height: 34px;
  line-height: 34px;
  border-width: ${border.size}px ${border.size}px ${border.size}px 0;
  border-color: ${({ theme }: ContainerProps) => theme.orbit.paletteInkLighter};
  border-radius: 0;
  background: ${({ theme, active }: ContainerProps) =>
    theme.orbit[active ? "paletteCloudNormal" : "paletteWhite"]};
  font-size: 15px;
  font-weight: 500;
  ${({ active }: ContainerProps) => active && shadowMixin};
  ${({ active }: ContainerProps) => !active && hoverMixin};
  transition: background 0.3s;

  &:first-child {
    border-width: ${border.size}px;
    border-radius: 3px 0 0 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
  }

  &:focus {
    outline: none;
  }

  &:active {
    ${shadowMixin};
  }

  &:disabled {
    color: ${({ theme }: ContainerProps) => theme.orbit.paletteInkDark};
  }
`;

Container.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  id: string,
  onClick: string => void,
  active: boolean,
  children: React.Node,
|};

export default class Tab extends React.PureComponent<Props> {
  static defaultProps = {
    active: false,
  };

  handleClick = () => {
    const { onClick, id } = this.props;

    onClick(id);
  };

  render() {
    const { id, children, active } = this.props;

    return (
      <Container id={id} onClick={this.handleClick} disabled={active} active={active}>
        {children}
      </Container>
    );
  }
}
