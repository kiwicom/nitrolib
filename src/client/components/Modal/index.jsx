// @flow strict
import * as React from "react";

import ClientOnly from "../ClientOnly";
import ModalOverlay from "../ModalOverlay";
import Portal from "./Portal";

type Props = {|
  children: React.Node,
  onClose: () => void,
|};

const Modal = (props: Props) => (
  <ClientOnly>
    <Portal>
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
    </Portal>
  </ClientOnly>
);

export default Modal;
