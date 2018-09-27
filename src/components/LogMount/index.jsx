// @flow strict
import * as React from "react";

import type { Event } from "../../records/Event";
import { Consumer } from "../../services/log/context";
import Core from "./components/Core";

type Props<E, D> = {|
  event: Event<E, D>,
|};

const LogMount = <E, D>({ event }: Props<E, D>) => (
  <Consumer>{({ log }) => <Core event={event} onLog={log} />}</Consumer>
);

export default LogMount;
