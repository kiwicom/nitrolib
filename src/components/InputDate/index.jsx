// @flow strict
import * as React from "react";
import styled from "styled-components";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import { right, left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import calculateRanges from "../../services/dates/calculateRanges";
import Dates from "./Dates";
import Months from "./Months";
import Years from "./Years";

const SelectContainer = styled.div`
  width: 100%;
  margin: 0 5px;

  &:first-child {
    margin-${/* sc-custom "left" */ left}: 0;
  }

  &:last-child {
    margin-${/* sc-custom "right" */ right}: 0;
  }
`;

SelectContainer.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  id: string,
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
    const { id, value, min, max, format } = this.props;
    const { dates, months, years } = calculateRanges(min, max, value);

    const parts = {
      D: (
        <SelectContainer key="D">
          <Dates id={id} value={value} onChange={this.handleChangeDate} dates={dates} />
        </SelectContainer>
      ),
      M: (
        <SelectContainer key="M">
          <Months id={id} value={value} onChange={this.handleChangeMonth} months={months} />
        </SelectContainer>
      ),
      Y: (
        <SelectContainer key="Y">
          <Years id={id} value={value} onChange={this.handleChangeYear} years={years} />
        </SelectContainer>
      ),
    };

    return <Flex x="space-between">{format.map(item => parts[item])}</Flex>;
  }
}

export default InputDate;
