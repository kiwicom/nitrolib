// @flow strict
import * as React from "react";

import type { Globals } from "../../records/Loglady";
import type { Event, Props as EventProps, EventPayload } from "../../records/Event";
import type { Context } from "../../services/log/context";
import log from "../../services/log/api";
import { make } from "../../records/Event";

type Props = {|
  globals: Globals, // TODO get from logger
  onLog?: (ev: EventPayload, globals: Globals) => void,
  children: (ctx: Context) => React.Node,
|};

export default class InitLog extends React.PureComponent<Props> {
  handleLog = (ev: Event, props: EventProps) => {
    const { onLog, globals } = this.props;

    const event = make(ev, props);
    if (onLog) {
      onLog(event, globals);
      return;
    }

    log({ events: [event], global: globals });
  };

  render() {
    const { children } = this.props;

    return children({ log: this.handleLog });
  }
}
