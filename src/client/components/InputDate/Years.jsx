// @flow strict
import * as React from "react";
import getYear from "date-fns/getYear";

import Select from "../Select";

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  years: number[],
|};

const Years = (props: Props) => (
  <Select id={`${props.id}-year`} value={String(getYear(props.value))} onChange={props.onChange}>
    {props.years.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </Select>
);

export default Years;
