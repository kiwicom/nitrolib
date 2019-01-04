// @flow strict
import * as React from "react";
import { Transition } from "react-transition-group";

import Core from "./components/Core";

const DURATION = 250;

type Props = {|
  shown: boolean,
  onClick: () => void,
  children: React.Node,
|};

const SideBar = ({ shown, onClick, children }: Props) => (
  <Transition in={shown} timeout={DURATION}>
    {status => (
      <Core status={status} onClick={onClick}>
        {children}
      </Core>
    )}
  </Transition>
);

export default SideBar;
