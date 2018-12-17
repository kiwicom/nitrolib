// @flow strict
import * as React from "react";

import { Consumer } from "./context";
import type { Context } from "./context";

type Props<T> = {|
  ...T,
  context: Context<any, any>,
|};

export type Decorated<T> = React.ComponentType<$Diff<T, { context: Context<any, any> }>>;

const decorator = <T>(Component: React.ComponentType<Props<T>>): React.ComponentType<T> => {
  const Wrapper = (props: T) => (
    <Consumer>{ctx => <Component {...props} context={ctx} />}</Consumer>
  );

  Wrapper.displayName = `log(${Component.displayName || "Component"})`;

  Wrapper.WrappedComponent = Component;

  return Wrapper;
};

export default decorator;
