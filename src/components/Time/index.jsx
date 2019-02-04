// @flow strict
import * as React from "react";
import format from "date-fns/format";

import { Consumer } from "../../services/intl/context";
import { fixTimeFormat } from "../../records/LangInfo";

type Props = {|
  time: Date,
|};

const Time = ({ time }: Props) => (
  <Consumer>{intl => format(time, fixTimeFormat(intl.language.timeFormat))}</Consumer>
);

export default Time;
