// @flow
import * as React from "react";
import format from "date-fns/format";

import { fixTimeFormat } from "../../records/LangInfo";
import { Consumer } from "../../services/intl/context";
import { fixTimeFormat } from "../../records/LangInfo";

type Props = {|
  time: Date,
|};

const Time = (props: Props) => (
  <Consumer>{intl => format(props.time, fixTimeFormat(intl.language.timeFormat))}</Consumer>
);

export default Time;
