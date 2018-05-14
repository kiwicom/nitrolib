// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";
import { border } from "../../styles";

const shadowMixin = css`
  box-shadow: 0 0 3px 0 ${({ theme }: ThemeProps) => theme.colors["neutral-400"]} inset;
`;

const hoverMixin = css`
  cursor: pointer;

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.colors.white};
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
  border-color: ${({ theme }: ContainerProps) => theme.colors["neutral-400"]};
  border-radius: 0;
  background: ${({ theme, active }: ContainerProps) =>
    theme.colors[active ? "neutral-100" : "white"]};
  font-size: 15px;
  font-weight: 500;
  ${(props: ContainerProps) => props.active && shadowMixin};
  ${(props: ContainerProps) => !props.active && hoverMixin};
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
    color: ${({ theme }: ContainerProps) => theme.colors["text-secondary"]};
  }
`;

Container.defaultProps = {
  theme: brandDefault.theme,
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
