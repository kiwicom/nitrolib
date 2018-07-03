// @flow strict
import * as React from "react";

import ClientOnly from "../ClientOnly/index";
import ModalOverlay from "../ModalOverlay/index";
import Portal from "./Portal";

type Props = {|
  children: React.Node,
  onClose: () => void,
|};

const Modal = ({ onClose, children }: Props) => (
  <ClientOnly>
    <Portal>
      <ModalOverlay onClose={onClose}>{children}</ModalOverlay>
    </Portal>
  </ClientOnly>
);

export default Modal;
