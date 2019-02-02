// @flow strict
import * as React from "react";

export type Context = {|
  value: string,
  onChange: (value?: string) => void,
|};

const context: React.Context<Context> = React.createContext({
  value: "",
  onChange: () => {},
});

export const { Consumer, Provider } = context;

export default context;
