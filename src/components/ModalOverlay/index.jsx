// @flow strict
import * as React from "react";
import styled from "styled-components";
import Close from "react-icons/lib/md/close";

/**
 * This is a copy of FE's old modal design.
 * Refresh once the new design is done.
 */

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0;
  width: 400px;
`;

const StyledClose = styled(Close)`
  position: absolute;
  height: 24px;
  width: 24px;
  top: -28px;
  right: -5px;
  cursor: pointer;
  color: white;
`;

type Props = {|
  children: React.Node,
  onClose: () => void,
|};

export default class ModalOverlay extends React.PureComponent<Props> {
  handleKeyDown = (ev: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { onClose } = this.props;
    if (ev.key === "Escape") {
      onClose();
    }
  };

  render() {
    const { onClose, children } = this.props;

    return (
      <Container tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Wrapper>
          <StyledClose onClick={onClose} />
          {children}
        </Wrapper>
      </Container>
    );
  }
}