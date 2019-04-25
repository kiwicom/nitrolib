// @flow strict
import * as React from "react";
import getMonth from "date-fns/getMonth";

import Select from "../Select";
import { Consumer } from "../../services/intl/context";

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

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  months: number[],
|};

const Months = ({ id, value, onChange, months }: Props) => (
  <Consumer>
    {({ translate }) => (
      <Select id={`${id}-month`} value={String(getMonth(value))} onChange={onChange}>
        {months.map(month => (
          <option key={month} value={month}>
            {translate(MONTHS[month])}
          </option>
        ))}
      </Select>
    )}
  </Consumer>
);

export default Months;
