// @flow strict
import * as React from "react";
import getMonth from "date-fns/getMonth";

import Select from "../Select";
import Text from "../Text";

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

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  months: number[],
|};

const Months = ({ id, value, onChange, months }: Props) => (
  <Select id={`${id}-month`} value={String(getMonth(value))} onChange={onChange}>
    {months.map(month => (
      <option key={month} value={month}>
        <Text t={MONTHS[month]} />
      </option>
    ))}
  </Select>
);

export default Months;
