// @flow strict
import * as React from "react";

import type { Event } from "../../../../records/Event";

type Props<E, D> = {|
  event: Event<E, D>,
  onLog: (event: Event<E, D>) => void,
|};

export default class Core<E, D> extends React.Component<Props<E, D>> {
  componentDidMount() {
    const { event, onLog } = this.props;

    onLog(event);
  }

  render() {
    return null;
  }
}
