// @flow strict
import * as React from "react";
import format from "date-fns/format";

import { Consumer } from "../../services/intl/context";

type Props = {
  time: Date,
};

const Time = (props: Props) => (
  <Consumer>{intl => format(props.time, intl.language.timeFormat)}</Consumer>
);

export default Time;
