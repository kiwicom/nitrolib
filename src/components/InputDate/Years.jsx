// @flow strict
import * as React from "react";
import getYear from "date-fns/getYear";

import Select from "../../Select";

type Props = {|
  id: string,
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  years: number[],
|};

const Years = ({ id, value, onChange, years }: Props) => (
  <Select id={`${id}-year`} value={String(getYear(value))} onChange={onChange}>
    {years.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </Select>
);

export default Years;
