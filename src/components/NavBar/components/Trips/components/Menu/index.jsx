// @flow
import * as React from "react";

import Popup from "../../primitives/Popup";

type Props = {|
  children: React.Node,
|};

const Menu = ({ children }: Props) => <Popup>{children}</Popup>;

export default Menu;
