// @flow strict
import * as React from "react";
import getMonth from "date-fns/getMonth";
import Select from "@kiwicom/orbit-components/lib/Select";

import { useIntl } from "../../../../services/intl/context";

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
  value: Date,
  onChange: (ev: SyntheticInputEvent<HTMLSelectElement>) => void,
  months: number[],
|};

const Months = ({ value, onChange, months }: Props) => {
  const { translate } = useIntl();

  return (
    <Select
      key={String(value)}
      value={String(getMonth(value))}
      options={months.map(month => ({
        value: month,
        label: translate(MONTHS[month]),
      }))}
      onChange={onChange}
    ></Select>
  );
};

export default Months;
