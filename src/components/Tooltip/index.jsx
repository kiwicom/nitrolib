// @flow strict
import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { BORDER_RADIUS } from "../../consts/layout";
import { brandDefault } from "../../records/Brand";
import mq from "../../styles/mediaQuery";

type Props = {|
  position: "left" | "right" | "top" | "bottom",
  tip: React.Node,
  inline: boolean,
  mobile: boolean,
  children: React.Node,
|};

type State = {|
  shown: boolean,
|};

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

// $FlowIssue
Container.propTypes = {
  inline: PropTypes.bool.isRequired,
};

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
  ${({ position }) =>
    (position === "left" &&
      `
        right: 100%;
        padding-right: ${TIP_ARROW_SIZE}px;
        margin-right: ${TIP_OFFSET}px;
      `) ||
    (position === "right" &&
      `
        left: 100%;
        padding-left: ${TIP_ARROW_SIZE}px;
        margin-left: ${TIP_OFFSET}px;
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

  ${mq.gtTablet`
    display: block;
  `} &:before {
    display: block;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: ${TIP_ARROW_SIZE + 1}px;
    ${({ theme, position }) =>
      (position === "left" &&
        `
          right: 0;
          border-right-width: 0;
          border-left-color: ${theme.colors["grey-900"]};
        `) ||
      (position === "right" &&
        `
          left: 0;
          border-left-width: 0;
          border-right-color: ${theme.colors["grey-900"]};
        `) ||
      (position === "top" &&
        `
          bottom: 0;
          border-bottom-width: 0;
          border-top-color: ${theme.colors["grey-900"]};
        `) ||
      (position === "bottom" &&
        `
          top: 0;
          border-top-width: 0;
          border-bottom-color: ${theme.colors["grey-900"]};
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

// $FlowIssue
Tip.propTypes = {
  position: PropTypes.oneOf(["left", "right", "top", "bottom"]).isRequired,
  shown: PropTypes.bool.isRequired,
  mobile: PropTypes.bool.isRequired,
};

Tip.defaultProps = {
  theme: brandDefault.theme,
};

const TipContent = styled.span`
  display: block;
  padding: 6px 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors["grey-900"]};
  border-radius: ${BORDER_RADIUS}px;
`;

TipContent.defaultProps = {
  theme: brandDefault.theme,
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
