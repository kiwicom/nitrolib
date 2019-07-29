import * as React from "react";
import styled, { css } from "styled-components";
import { left, right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../records/Theme";
import { ThemeProps } from "../../records/Theme";

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
        ${right({ theme })}: 100%;
        padding-${right({ theme })}: ${TIP_ARROW_SIZE}px;
        margin-${right({ theme })}: ${TIP_OFFSET}px;
      `) ||
    (position === "right" &&
      `
        ${left({ theme })}: 100%;
        padding-${left({ theme })}: ${TIP_ARROW_SIZE}px;
        margin-${left({ theme })}: ${TIP_OFFSET}px;
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

  ${mq.tablet(css`
    display: block;
  `)} &:before {
    display: block;
    content: ;
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: ${({ theme }: ThemeProps) => theme.orbit.borderStyleCard};
    border-width: ${TIP_ARROW_SIZE + 1}px;
    ${({ theme, position }) =>
      (position === "left" &&
        `
          ${right({ theme })}: 0;
          border-${right({ theme })}-width: 0;
          border-${left({ theme })}-color: ${theme.orbit.paletteInkDark};
        `) ||
      (position === "right" &&
        `
          ${left({ theme })}: 0;
          border-${left({ theme })}-width: 0;
          border-${right({ theme })}-color: ${theme.orbit.paletteInkDark};
        `) ||
      (position === "top" &&
        `
          bottom: 0;
          border-bottom-width: 0;
          border-top-color: ${theme.orbit.paletteInkDark};
        `) ||
      (position === "bottom" &&
        `
          top: 0;
          border-top-width: 0;
          border-bottom-color: ${theme.orbit.paletteInkDark};
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
  background-color: ${({ theme }) => theme.orbit.paletteInkDark};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
`;

TipContent.defaultProps = {
  theme: themeDefault,
};

type Props = {
  position: "left" | "right" | "top" | "bottom",
  tip: React.ReactNode,
  inline: boolean,
  mobile: boolean,
  children: React.ReactNode,
};

type State = {
  shown: boolean,
};

class Tooltip extends React.PureComponent<Props, State> {
  static defaultProps = {
    inline: false,
    mobile: false,
  };

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
    const { tip, position, inline, mobile, children } = this.props;
    const { shown } = this.state;

    return (
      <Container
        onTouchStart={this.handleIn}
        onTouchEnd={this.handleOut}
        onMouseOver={this.handleIn}
        onMouseOut={this.handleOut}
        onFocus={this.handleIn}
        onBlur={this.handleOut}
        inline={inline}
      >
        {children}
        <Tip shown={shown} position={position} mobile={mobile}>
          <TipContent>{tip}</TipContent>
        </Tip>
      </Container>
    );
  }
}

export default Tooltip;
