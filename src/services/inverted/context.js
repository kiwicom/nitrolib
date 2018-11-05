// @flow strict
import * as React from "react";

// TODO remove this file, make via props
type Inverted = {|
  inverted?: boolean,
|};

// $FlowFixMe
export const { Consumer, Provider } = React.createContext(({ inverted: false }: Inverted));
