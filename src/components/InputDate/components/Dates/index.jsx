// @flow strict
import * as React from "react";
import getDate from "date-fns/getDate";
import Select from "@kiwicom/orbit-components/lib/Select";

type Props = {|
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  dates: number[],
|};

const Dates = ({ value, onChange, dates }: Props) => (
  <Select
    key={String(value)}
    options={dates.map(date => ({ value: date, label: String(date) }))}
    value={String(getDate(value))}
    onChange={onChange}
  ></Select>
);

export default Dates;
