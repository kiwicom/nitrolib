// @flow strict
import * as React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { right, translate3d } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../../../styles/mq";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

type ShownProps = {|
  shown: boolean,
  showing: boolean,
|};

const Container = styled.section`
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

const Wrapper = styled.div`
  width: 480px;
  position: absolute;
  ${right}: 0;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  overflow-y: auto;
  height: 100%;
  transform: ${({ shown }) => (shown ? translate3d("0") : translate3d("480px, 0, 0"))};
  transition: transform ${({ theme }: ThemeProps) => theme.orbit.durationNormal} ease-in-out;
  box-shadow: 0 6px 16px rgba(46, 53, 59, 0.22), 0 1px 3px rgba(0, 0, 0, 0.09);

  ${mq.ltTablet(css`
    max-width: 320px;
    width: 100%;
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  status: "entering" | "entered" | "exiting" | "exited" | "unmounted",
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
    const { status, onClick, children } = this.props;

    return ReactDOM.createPortal(
      <Container
        shown={status !== "exited"}
        entered={status === "entered"}
        ref={this.ref}
        onClick={(ev: SyntheticEvent<HTMLDivElement>) => {
          if (this.ref.current === ev.target) {
            onClick();
          }
        }}
        role="button"
        tabIndex="0"
      >
        <Wrapper shown={status !== "exiting" && status !== "exited"}>{children}</Wrapper>
      </Container>,
      this.el,
    );
  }
}
