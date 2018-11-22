// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import mq from "../../styles/mq";
import * as rtl from "../../styles/rtl";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const TIP_ARROW_SIZE = 5;
const TIP_OFFSET = 2;

const Container = styled.span`
  position: relative;
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  ${({ inline }) =>
    !inline &&
    `
      width: 100%;
    `};
`;

const Tip = styled.span`
  position: absolute;
  opacity: ${({ shown }) => (shown ? "1" : "0")};
  ${({ mobile }) => !mobile && `display: none;`} ${({ shown }) =>
    !shown &&
    `
      width: 0;
      height: 0;
      overflow: hidden;
    `}
  transition: opacity 0.2s;
  z-index: 2;
  ${({ position, theme }) =>
    (position === "left" &&
      `
        ${rtl.right({ theme })}: 100%;
        padding-${rtl.right({ theme })}: ${TIP_ARROW_SIZE}px;
        margin-${rtl.right({ theme })}: ${TIP_OFFSET}px;
      `) ||
    (position === "right" &&
      `
        ${rtl.left({ theme })}: 100%;
        padding-${rtl.left({ theme })}: ${TIP_ARROW_SIZE}px;
        margin-${rtl.left({ theme })}: ${TIP_OFFSET}px;
      `) ||
    (position === "top" &&
      `
        bottom: 100%;
        padding-bottom: ${TIP_ARROW_SIZE}px;
        margin-bottom: ${TIP_OFFSET}px;
      `) ||
    (position === "bottom" &&
      `
        top: 100%;
        padding-top: ${TIP_ARROW_SIZE}px;
        margin-top: ${TIP_OFFSET}px;
      `)};

  ${({ position, move }) =>
    position === "left" || position === "right"
      ? `
        top: ${50 - move}%;
        transform: translateY(-50%);
      `
      : `
        left: ${50 - move}%;
        transform: translateX(-50%);
      `};

  ${mq.gtTablet(css`
    display: block;
  `)} &:before {
    display: block;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: ${({ theme }: ThemeProps) => theme.orbit.borderStyleCard};
    border-width: ${TIP_ARROW_SIZE + 1}px;
    ${({ theme, position, color }) =>
      (position === "left" &&
        `
          ${rtl.right({ theme })}: 0;
          border-${rtl.right({ theme })}-width: 0;
          border-${rtl.left({ theme })}-color: ${color || theme.orbit.paletteInkDark};
        `) ||
      (position === "right" &&
        `
          ${rtl.left({ theme })}: 0;
          border-${rtl.left({ theme })}-width: 0;
          border-${rtl.right({ theme })}-color: ${color || theme.orbit.paletteInkDark};
        `) ||
      (position === "top" &&
        `
          bottom: 0;
          border-bottom-width: 0;
          border-top-color: ${color || theme.orbit.paletteInkDark};
        `) ||
      (position === "bottom" &&
        `
          top: 0;
          border-top-width: 0;
          border-bottom-color: ${color || theme.orbit.paletteInkDark};
        `)};

    ${({ position }) =>
      position === "left" || position === "right"
        ? `
          top: 50%;
          transform: translateY(-50%);
        `
        : `
          left: 50%;
          transform: translateX(-50%);
        `};
  }
`;

Tip.defaultProps = {
  theme: themeDefault,
};

const TipContent = styled.span`
  display: block;
  line-height: 30px;
  padding: 0px 8px;
  color: ${({ theme }) => theme.orbit.paletteWhite};
  background-color: ${({ theme, color }) => color || theme.orbit.paletteInkDark};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  ${({ position, move }) =>
    move === 0
      ? ""
      : `
        transform: translate${position === "left" || position === "right" ? "Y" : "X"}(
          calc(${move}% - ${(move < 0 ? -1 : 1) * TIP_ARROW_SIZE}px)
        )
      `};
`;

TipContent.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  position: "left" | "right" | "top" | "bottom",
  tip: React.Node,
  inline: boolean,
  mobile: boolean,
  children: React.Node,
  disabled: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  alwaysOn: boolean,
  color: ?string,
  moveContent: number,
  moveArrow: number,
|};

type State = {|
  shown: boolean,
|};

class Tooltip extends React.PureComponent<Props, State> {
  static defaultProps = {
    inline: false,
    mobile: false,
    disabled: false,
    alwaysOn: false,
    color: null,
    moveContent: 0,
    moveArrow: 0,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { disabled, alwaysOn } = props;
    const { shown } = state;

    if (alwaysOn && !disabled && !shown) {
      return { shown: true };
    }

    if (disabled && shown) {
      return { shown: false };
    }

    return null;
  }

  state = {
    shown: false,
  };

  handleIn = () => {
    this.setState({ shown: true });
  };

  handleOut = () => {
    this.setState({ shown: false });
  };

  render() {
    const {
      tip,
      position,
      inline,
      mobile,
      disabled,
      color,
      moveContent,
      moveArrow,
      children,
    } = this.props;
    const { shown } = this.state;

    const handleIn = disabled ? undefined : this.handleIn;
    const handleOut = disabled ? undefined : this.handleOut;

    return (
      <Container
        onTouchStart={handleIn}
        onTouchEnd={handleOut}
        onMouseOver={handleIn}
        onMouseOut={handleOut}
        onFocus={handleIn}
        onBlur={handleOut}
        inline={inline}
      >
        {children}
        <Tip shown={shown} position={position} mobile={mobile} color={color} move={moveArrow}>
          <TipContent position={position} color={color} move={moveContent}>
            {tip}
          </TipContent>
        </Tip>
      </Container>
    );
  }
}

export default Tooltip;
