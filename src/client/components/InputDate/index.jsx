// @flow
import * as React from "react";
import styled from "styled-components";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

import Flex from "client/primitives/Flex";
import Text from "../Text";
import Select from "../Select";
import calculateRanges from "./services/calculateRanges";
import minMaxCheck from "./services/minMaxCheck";

const SelectContainer = styled.div`
  width: 100%;
  margin: 0 5px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const MONTHS = [
  __("January"),
  __("February"),
  __("March"),
  __("April"),
  __("May"),
  __("June"),
  __("July"),
  __("August"),
  __("September"),
  __("October"),
  __("November"),
  __("December"),
];

type Props = {
  id: string,
  value: Date,
  min: Date,
  max: Date,
  onChange: Date => void,
  mmddyyyy: boolean,
};

class InputDate extends React.PureComponent<Props> {
  static defaultProps = {
    mmddyyyy: false,
  };

  componentDidMount() {
    minMaxCheck(this.props.value, this.props.min, this.props.max, this.props.onChange);
  }

  componentWillReceiveProps(nextProps: Props) {
    minMaxCheck(nextProps.value, nextProps.min, nextProps.max, nextProps.onChange);
  }

  handleChangeDay = (ev: SyntheticInputEvent<HTMLSelectElement>) => {
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
              <Select
                id={`${id}-month`}
                value={String(getMonth(value))}
                onChange={this.handleChangeMonth}
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    <Text t={MONTHS[month]} />
                  </option>
                ))}
              </Select>
            </SelectContainer>
            <SelectContainer>
              <Select
                id={`${id}-date`}
                value={String(getDate(value))}
                onChange={this.handleChangeDay}
              >
                {dates.map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </SelectContainer>
          </>
        ) : (
          <>
            <SelectContainer>
              <Select
                id={`${id}-date`}
                value={String(getDate(value))}
                onChange={this.handleChangeDay}
              >
                {dates.map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </SelectContainer>
            <SelectContainer>
              <Select
                id={`${id}-month`}
                value={String(getMonth(value))}
                onChange={this.handleChangeMonth}
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    <Text t={MONTHS[month]} />
                  </option>
                ))}
              </Select>
            </SelectContainer>
          </>
        )}
        <SelectContainer>
          <Select id={`${id}-year`} value={String(getYear(value))} onChange={this.handleChangeYear}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </SelectContainer>
      </Flex>
    );
  }
}

export default InputDate;
