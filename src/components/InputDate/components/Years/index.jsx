// @flow strict
import * as React from "react";
import getYear from "date-fns/getYear";
import Select from "@kiwicom/orbit-components/lib/Select";

type Props = {|
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  years: number[],
|};

const Years = ({ value, onChange, years }: Props) => (
  <Select
    key={String(value)}
    value={String(getYear(value))}
    options={years.map(year => ({
      value: year,
      label: String(year),
    }))}
    onChange={onChange}
  ></Select>
);

export default Years;
