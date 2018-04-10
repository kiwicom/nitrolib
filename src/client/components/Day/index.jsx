// @flow
import * as React from "react";
import format from "date-fns/format";

import { Consumer } from "client/services/intl/context";

type Props = {
  date: Date,
  format?: string,
};

const Day = (props: Props) => (
  <Consumer>{intl => format(props.date, props.format || intl.language.dateFormat)}</Consumer>
);

export default Day;
