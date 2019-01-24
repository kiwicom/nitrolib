// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import setDate from "date-fns/setDate";
import addMonths from "date-fns/addMonths";
import isWithinInterval from "date-fns/isWithinInterval";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";
import format from "date-fns/format";

import { fixDateFormat } from "../../records/LangInfo";
import Calendar from "./components/Calendar/index";
import ClickOutside from "../ClickOutside";
import DatePickerWrapper from "./primitives/DatePickerWrapper";
import { Consumer as IntlConsumer } from "../../services/intl/context";

type Props = {|
  value: Date,
  onChange: (date: Date) => void,
  label: string,
  icon?: React.Node,
  min: Date,
  max: Date,
|};

type State = {|
  active: boolean,
  viewing: Date,
|};

export default class DatePicker extends React.Component<Props, State> {
  state = {
    active: false,
    // eslint-disable-next-line react/destructuring-assignment
    viewing: this.props.value,
  };

  handleOpen = () => {
    this.setState({
      active: true,
    });
  };

  handleClose = () => {
    this.setState({
      active: false,
    });
  };

  handleSelect = (day: number) => {
    const { onChange } = this.props;
    const { viewing } = this.state;

    this.handleClose();
    this.setState({
      viewing: setDate(viewing, day),
    });

    onChange(setDate(viewing, day));
  };

  handleDecrease = () => {
    const { viewing } = this.state;
    const { min, max } = this.props;

    const viewingNew = addMonths(viewing, -1);
    if (!isWithinInterval(viewingNew, { start: startOfMonth(min), end: endOfMonth(max) })) {
      return;
    }

    this.setState({ viewing: viewingNew });
  };

  handleIncrease = () => {
    const { viewing } = this.state;
    const { min, max } = this.props;

    const viewingNew = addMonths(viewing, 1);
    if (!isWithinInterval(viewingNew, { start: startOfMonth(min), end: endOfMonth(max) })) {
      return;
    }

    this.setState({ viewing: viewingNew });
  };

  render() {
    const { value, min, max, label, icon } = this.props;
    const { active, viewing } = this.state;

    return (
      <ClickOutside active={active} onClickOutside={this.handleClose}>
        <DatePickerWrapper active={active}>
          <IntlConsumer>
            {intl => (
              <>
                <InputField
                  inlineLabel
                  placeholder={format(value, fixDateFormat(intl.language.dateFormat))}
                  maxLength={0}
                  onFocus={this.handleOpen}
                  label={label}
                  prefix={icon}
                />
                {active && (
                  <Calendar
                    value={value}
                    viewing={viewing}
                    min={min}
                    max={max}
                    onSelect={this.handleSelect}
                    onDecrease={this.handleDecrease}
                    onIncrease={this.handleIncrease}
                  />
                )}
              </>
            )}
          </IntlConsumer>
        </DatePickerWrapper>
      </ClickOutside>
    );
  }
}
