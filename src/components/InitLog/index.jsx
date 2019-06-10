// @flow strict
import * as React from "react";

import type { Event, Props as EventProps } from "../../records/Event";
import type { Context } from "../../services/log/context";
import * as logger from "../../services/log/logger";

type Props = {|
  children: (ctx: Context) => React.Node,
|};

export default class InitLog extends React.PureComponent<Props> {
  handleLog = (ev: Event, props: EventProps) => {
    logger.log(ev, props);
  };

  render() {
    const { children } = this.props;

    return children({ log: this.handleLog });
  }
}
