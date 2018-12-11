// @flow strict
import * as React from "react";

type Props = {|
  children: React.Node,
|};

const Sign = ({ children }: Props) => <span>{children}</span>;

export default Sign;
