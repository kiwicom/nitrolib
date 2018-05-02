// @flow strict
import * as React from "react";

import ClientOnly from "../ClientOnly";
import Portal from "./Portal";

type Props = {|
  children: React.Node,
|};

const Modal = (props: Props) => (
  <ClientOnly>
    <Portal>{props.children}</Portal>
  </ClientOnly>
);

export default Modal;
