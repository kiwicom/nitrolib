// @flow strict
import * as React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { Transition } from "react-transition-group";

import mq from "../../../../styles/mediaQuery";

const DURATION = 250;

type ShownProps = {|
  shown: boolean,
  showing: boolean,
|};

const Container = styled.section`
  display: flex;
  visibility: ${({ shown }: ShownProps) => (shown ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  right: ${({ showing }: ShownProps) => (showing ? "0" : "-480px")};
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: right ${DURATION}ms ease-in-out;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 480px;
  font-weight: 500;
  font-size: 14px;
  background: white;
  overflow-y: auto;
  box-shadow: 0 6px 16px rgba(46, 53, 59, 0.22), 0 1px 3px rgba(0, 0, 0, 0.09);

  ${mq.ltTablet(css`
    max-width: 320px;
    width: 100%;
  `)};
`;

type Props = {|
  shown: boolean,
  onClick: () => void,
  children: React.Node,
|};

export default class SideBar extends React.Component<Props> {
  node = document.getElementById("sidebar") || document.body;

  el = document.createElement("div");

  ref = React.createRef();

  componentDidMount() {
    if (this.node) {
      this.node.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeChild(this.el);
    }
  }

  render() {
    const { shown, onClick, children } = this.props;

    return ReactDOM.createPortal(
      <Transition in={shown} timeout={DURATION}>
        {status => (
          <Container
            shown={status !== "exited"}
            showing={status === "entering" || status === "entered"}
            innerRef={this.ref}
            onClick={(ev: SyntheticEvent<HTMLDivElement>) => {
              if (this.ref.current === ev.target) {
                onClick();
              }
            }}
            role="button"
            tabIndex="0"
          >
            <Wrapper>{children}</Wrapper>
          </Container>
        )}
      </Transition>,
      this.el,
    );
  }
}
