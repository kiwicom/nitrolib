// @flow strict
import * as React from "react";
import { Transition } from "react-transition-group";

import Core from "./components/Core";

const DURATION = 250;

type Props = {|
  shown: boolean,
  inverted?: boolean,
  onClick: () => void,
  children: React.Node,
|};

const SideBar = ({ shown, inverted, onClick, children }: Props) => (
  <Transition in={shown} timeout={DURATION}>
    {status => (
      <Core status={status} inverted={inverted} onClick={onClick}>
        {children}
      </Core>
    )}
  </Transition>
);

export default SideBar;
