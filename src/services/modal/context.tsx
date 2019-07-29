import * as React from "react";

export type Context = {
  value: string,
  onChange: (value?: string) => void,
};

  const context: React.Context<Context> = React.createContext({
    value: string,
    onChange: () => { },
  });

export const { Consumer, Provider } = context;

export default context;
