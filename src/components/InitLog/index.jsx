// @flow strict
import * as React from "react";

import type { Globals } from "../../records/Loglady";
import type { Event, Props as EventProps, EventPayload } from "../../records/Event";
import type { Context } from "../../services/log/context";
import { make } from "../../records/Event";

type Props = {|
  globals: Globals,
  onLog: (ev: EventPayload, globals: Globals) => void,
  children: (ctx: Context) => React.Node,
|};

export default class InitLog extends React.PureComponent<Props> {
  handleLog = (ev: Event, props: EventProps) => {
    const { onLog, globals } = this.props;

    onLog(make(ev, props), globals);
  };

  render() {
    const { children } = this.props;

    return children({ log: this.handleLog });
  }
}
