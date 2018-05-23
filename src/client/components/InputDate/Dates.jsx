// @flow strict
import * as React from "react";
import getDate from "date-fns/getDate";

import Select from "../Select";

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  dates: number[],
|};

const Dates = (props: Props) => (
  <Select id={`${props.id}-date`} value={String(getDate(props.value))} onChange={props.onChange}>
    {props.dates.map(date => (
      <option key={date} value={date}>
        {date}
      </option>
    ))}
  </Select>
);

export default Dates;
