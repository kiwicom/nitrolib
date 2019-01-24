// @flow strict
import * as React from "react";
import getYear from "date-fns/getYear";

import { Consumer as IntlConsumer } from "../../../../services/intl/context";
import Month from "../../primitives/Month";

type Props = {|
  month: number,
  viewing: Date,
|};

const MONTHS = [
  __("January"),
  __("February"),
  __("March"),
  __("April"),
  __("May"),
  __("June"),
  __("July"),
  __("August"),
  __("September"),
  __("October"),
  __("November"),
  __("December"),
];

const Months = ({ month, viewing }: Props) => (
  <IntlConsumer>
    {intl => (
      <Month key={month} value={month}>
        {intl.translate(MONTHS[month])} {getYear(viewing)}
      </Month>
    )}
  </IntlConsumer>
);

export default Months;
