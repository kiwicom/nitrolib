// @flow strict
import * as React from "react";
import getDate from "date-fns/getDate";

import Select from "../Select/index";

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  dates: number[],
|};

const Dates = ({ id, value, onChange, dates }: Props) => (
  <Select id={`${id}-date`} value={String(getDate(value))} onChange={onChange}>
    {dates.map(date => (
      <option key={date} value={date}>
        {date}
      </option>
    ))}
  </Select>
);

export default Dates;
