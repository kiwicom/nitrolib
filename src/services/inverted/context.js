// @flow strict
import * as React from "react";

type Inverted = {|
  inverted?: boolean,
|};

export const { Consumer, Provider } = React.createContext(({ inverted: false }: Inverted));
