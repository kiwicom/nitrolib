import * as React from "react";
import styled, { css } from "styled-components";
import { rtlSpacing, borderRadius } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { border } from "../../styles";
import { themeDefault } from "../../records/Theme";
import { ThemeProps } from "../../records/Theme";

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
  width: 100%;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 34px;
  line-height: 34px;
  border: ${border.size}px solid ${({ theme }: ContainerProps) => theme.orbit.paletteInkLighter};
  border-radius: 0;
  background: ${({ theme, active }: ContainerProps) =>
    theme.orbit[active ? "paletteCloudNormal" : "paletteWhite"]};
  font-size: 15px;
  font-weight: ${({ theme }: ContainerProps) => theme.orbit.fontWeightMedium};
  ${({ active }: ContainerProps) => active && shadowMixin};
  ${({ active }: ContainerProps) => !active && hoverMixin};
  transition: background ${({ theme }: ContainerProps) => theme.orbit.durationNormal};
  margin-bottom: ${({ theme }) => theme.orbit.spaceXXSmall};
  ${mq.largeMobile(css`
    border-width: ${rtlSpacing(`${border.size}px ${border.size}px ${border.size}px 0`)};
  `)};
  &:first-child {
    border-width: ${border.size}px;
    border-radius: ${borderRadius("3px 0 0 3px")};
  }

  &:last-child {
    border-radius: ${borderRadius("0 3px 3px 0")};
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

type Props = {
  id: string,
  onClick: string => void,
  active: boolean,
  children: React.ReactNode,
};

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
