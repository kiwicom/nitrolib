// @flow strict
import * as React from "react";

type Props = {|
  children: React.Node,
|};

const Name = ({ children }: Props) => <span>{children}</span>;

export default Name;
