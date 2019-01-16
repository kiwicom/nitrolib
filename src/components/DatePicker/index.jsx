// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import getYear from "date-fns/getYear";
import setDate from "date-fns/setDate";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import format from "date-fns/format";

import DatePicker from "./components/DatePicker";
import ClickOutside from "../ClickOutside";

type Props = {|
  onChange: (date: Date) => void,
  label: string,
  min: Date,
  max: Date,
  value: Date,
|};

type State = {|
  active: boolean,
  date: Date,
|};

const FORMAT = "ccc d MMM";

class DatePickerWrapper extends React.Component<Props, State> {
  state = {
    active: false,
    // eslint-disable-next-line react/destructuring-assignment
    date: this.props.value || new Date(),
  };

  handleToggle = () => {
    this.setState({
      active: true,
    });
  };

  handleClose = () => {
    this.setState({
      active: false,
    });
  };

  handleSelect = (date: Date, day: number | string) => {
    this.handleClose();

    this.setState({
      date: setDate(new Date(date), +day),
    });
  };

  handleDecrease = () => {
    const { date } = this.state;
    const { min } = this.props;

    const minDate = setDate(new Date(getYear(min), getMonth(min)), getDate(min));

    this.setState({
      date:
        date > minDate
          ? setDate(new Date(getYear(date), getMonth(date) - 1), getDate(date))
          : minDate,
    });
  };

  handleIncrease = () => {
    const { date } = this.state;
    const { max } = this.props;

    const maxDate = setDate(new Date(getYear(max), getMonth(max)), getDate(max));

    this.setState({
      date:
        date < maxDate
          ? setDate(new Date(getYear(date), getMonth(date) + 1), getDate(date))
          : maxDate,
    });
  };

  render() {
    const { min, max, value, onChange, label } = this.props;
    const { active, date } = this.state;

    return (
      <ClickOutside active={active} onClickOutside={this.handleClose}>
        <>
          <InputField
            inlineLabel
            placeholder={format(date, FORMAT)}
            maxLength={0}
            onChange={onChange}
            onFocus={this.handleToggle}
            label={label}
          />
          {active && (
            <DatePicker
              decrease={this.handleDecrease}
              increase={this.handleIncrease}
              value={value}
              date={date}
              onSelect={this.handleSelect}
              min={min}
              max={max}
            />
          )}
        </>
      </ClickOutside>
    );
  }
}

export default DatePickerWrapper;
