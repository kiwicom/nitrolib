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
  __("common.months.january"),
  __("common.months.february"),
  __("common.months.march"),
  __("common.months.april"),
  __("common.months.may"),
  __("common.months.june"),
  __("common.months.july"),
  __("common.months.august"),
  __("common.months.september"),
  __("common.months.october"),
  __("common.months.november"),
  __("common.months.december"),
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
