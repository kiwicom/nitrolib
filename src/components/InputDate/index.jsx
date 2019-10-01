// @flow strict
import * as React from "react";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import calculateRanges from "../../services/dates/calculateRanges";
import Dates from "./components/Dates";
import Months from "./components/Months";
import Years from "./components/Years";

type Props = {|
  value: Date,
  min: Date,
  max: Date,
  format: string[],
  onChange: Date => void,
|};

class InputDate extends React.PureComponent<Props> {
  static defaultProps = {
    format: ["D", "M", "Y"],
  };

  handleChangeDate = (ev: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onChange, value } = this.props;

    onChange(setDate(value, Number(ev.target.value)));
  };

  handleChangeMonth = (ev: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onChange, value } = this.props;

    onChange(setMonth(value, Number(ev.target.value)));
  };

  handleChangeYear = (ev: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onChange, value } = this.props;

    onChange(setYear(value, Number(ev.target.value)));
  };

  render() {
    const { value, min, max, format } = this.props;
    const { dates, months, years } = calculateRanges(min, max, value);

    const parts = {
      D: <Dates value={value} onChange={this.handleChangeDate} dates={dates} />,
      M: <Months value={value} onChange={this.handleChangeMonth} months={months} />,
      Y: <Years value={value} onChange={this.handleChangeYear} years={years} />,
    };

    return (
      <Stack flex spacing="condensed" justify="between">
        {format.map(item => (
          <Stack key={item}>{parts[item]}</Stack>
        ))}
      </Stack>
    );
  }
}

export default InputDate;
