// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import { right, left, translate3d } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

type ShownProps = {|
  shown: boolean,
  showing: boolean,
|};

type InvertedProps = {|
  ...ThemeProps,
  inverted?: boolean,
|};

const Container = styled.div`
  display: flex;
  visibility: ${({ shown }: ShownProps) => (shown ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ entered }) => (entered ? "rgba(0, 0, 0, .5)" : "transparent")};
  transition: background-color ${({ theme }: ThemeProps) => theme.orbit.durationNormal} ease-in-out;
  z-index: ${({ theme }: ThemeProps) => theme.orbit.zIndexModal};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const rightCSS = css`
  ${right}: 0;
  transform: ${({ shown }: ShownProps) => (shown ? translate3d("0") : translate3d("480px, 0, 0"))};
`;

const leftCSS = css`
  ${left}: 0;
  transform: ${({ shown }: ShownProps) => (shown ? translate3d("0") : translate3d("-480px, 0, 0"))};
`;

const Wrapper = styled.aside`
  ${({ inverted }: InvertedProps) => (!inverted ? rightCSS : leftCSS)};
  position: absolute;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  overflow-y: auto;
  height: 100%;
  transition: transform ${({ theme }: ThemeProps) => theme.orbit.durationNormal} ease-in-out;
  box-shadow: 0 6px 16px rgba(46, 53, 59, 0.22), 0 1px 3px rgba(0, 0, 0, 0.09);
  max-width: 320px;
  width: 100%;

  ${mq.tablet(css`
    width: 480px;
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  status: "entering" | "entered" | "exiting" | "exited" | "unmounted",
  inverted?: boolean,
  unmasked?: boolean,
  onClick: () => void,
  children: React.Node,
|};

export default class Core extends React.Component<Props> {
  el = document.createElement("div");

  ref: { current: HTMLDivElement | null } = React.createRef();

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  render() {
    const { status, inverted, unmasked, onClick, children } = this.props;

    return (
      <Portal>
        <Container
          inverted={inverted}
          shown={status !== "exited"}
          entered={!unmasked && status === "entered"}
          ref={this.ref}
          onClick={(ev: SyntheticEvent<HTMLDivElement>) => {
            if (unmasked) return;
            if (this.ref.current === ev.target) {
              onClick();
            }
          }}
          role="button"
          tabIndex="0"
        >
          <Wrapper inverted={inverted} shown={status !== "exiting" && status !== "exited"}>
            {children}
          </Wrapper>
        </Container>
      </Portal>
    );
  }
}
