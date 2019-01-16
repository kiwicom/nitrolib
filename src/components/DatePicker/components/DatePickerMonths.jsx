// @flow strict
import * as React from "react";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

import { Consumer as IntlConsumer } from "../../../services/intl/context";
import Month from "../primitives/Month";

type Props = {|
  months: Array<number>,
  date: Date,
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

const DatePickerMonths = ({ months, date }: Props) => (
  <IntlConsumer>
    {intl =>
      months.map((month, i) => (
        <Month key={month} value={month} shown={i === getMonth(date)}>
          {intl.translate(MONTHS[month])} {getYear(date)}
        </Month>
      ))
    }
  </IntlConsumer>
);

export default DatePickerMonths;
