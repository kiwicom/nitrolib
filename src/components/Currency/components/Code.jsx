// @flow strict
import * as React from "react";

type Props = {|
  children: React.Node,
|};

const Code = ({ children }: Props) => <span>{children}</span>;

export default Code;
