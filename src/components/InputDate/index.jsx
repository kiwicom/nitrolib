// @flow strict
import * as React from "react";
import styled from "styled-components";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";

import * as rtl from "../../styles/rtl";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import calculateRanges from "./services/calculateRanges";
import Dates from "./Dates";
import Months from "./Months";
import Years from "./Years";

const SelectContainer = styled.div`
  width: 100%;
  margin: 0 5px;

  &:first-child {
    margin-${rtl.left}: 0;
  }

  &:last-child {
    margin-${rtl.right}: 0;
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
  onChange: Date => void,
  mmddyyyy: boolean,
|};

class InputDate extends React.PureComponent<Props> {
  static defaultProps = {
    mmddyyyy: false,
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
    const { id, value, min, max, mmddyyyy } = this.props;
    const { dates, months, years } = calculateRanges(min, max, value);

    return (
      <Flex x="space-between">
        {mmddyyyy ? (
          <>
            <SelectContainer>
              <Months id={id} value={value} onChange={this.handleChangeMonth} months={months} />
            </SelectContainer>
            <SelectContainer>
              <Dates id={id} value={value} onChange={this.handleChangeDate} dates={dates} />
            </SelectContainer>
          </>
        ) : (
          <>
            <SelectContainer>
              <Dates id={id} value={value} onChange={this.handleChangeDate} dates={dates} />
            </SelectContainer>
            <SelectContainer>
              <Months id={id} value={value} onChange={this.handleChangeMonth} months={months} />
            </SelectContainer>
          </>
        )}
        <SelectContainer>
          <Years id={id} value={value} onChange={this.handleChangeYear} years={years} />
        </SelectContainer>
      </Flex>
    );
  }
}

export default InputDate;
