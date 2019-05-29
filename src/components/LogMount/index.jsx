// @flow strict
import * as React from "react";

import type { Event, Props as EventProps } from "../../records/Event";
import logContext from "../../services/log/context";
import type { Context } from "../../services/log/context";

type Props = {|
  event: Event,
  // defaulted
  props: EventProps,
|};

export default class Core extends React.Component<Props> {
  static defaultProps = {
    props: {},
  };

  static contextType = logContext;

  context: Context;

  componentDidMount() {
    const { event, props } = this.props;
    const { log } = this.context;

    log(event, props);
  }

  render() {
    return null;
  }
}
