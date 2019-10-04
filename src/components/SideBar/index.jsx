// @flow strict
import * as React from "react";
import { Transition } from "react-transition-group";

import Core from "./components/Core";

const DURATION = 250;

type Props = {|
  shown: boolean,
  inverted?: boolean,
  unmasked?: boolean,
  onClick: () => void,
  children: React.Node,
  className?: string,
|};

const SideBar = ({ shown, inverted, unmasked, onClick, children, className }: Props) => (
  <Transition in={shown} timeout={DURATION}>
    {status => (
      <Core
        className={className}
        status={status}
        inverted={inverted}
        onClick={onClick}
        unmasked={unmasked}
      >
        {children}
      </Core>
    )}
  </Transition>
);

export default SideBar;
