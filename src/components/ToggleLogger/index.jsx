// @flow strict
import * as React from "react";

import Toggle from "../Toggle";
import Core from "./components/Core";

type Data = {|
  open: boolean,
  onToggle: () => void,
|};

type Props = {|
  onOpen: () => void,
  children: (data: Data) => React.Node,
|};

const ToggleLogger = ({ onOpen, children }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <Core open={open} onToggle={onToggle} onOpen={onOpen}>
        {children}
      </Core>
    )}
  </Toggle>
);

export default ToggleLogger;
