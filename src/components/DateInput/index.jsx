// @flow strict

import * as React from "react";
import Select from "@kiwicom/orbit-components/lib/Select";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import isValid from "date-fns/isValid";
import endOfMonth from "date-fns/endOfMonth";

import months from "../../records/Months";
import errors from "../../consts/errors";
import { Consumer as IntlConsumer } from "../../services/intl/context";

type Props = {|
  label: string,
  value?: ?Date,
  error?: string,
  onChange: (?Date) => void,
|};

type State = {|
  date: string,
  month: string,
  year: string,
  dateFilled: boolean,
  monthFilled: boolean,
  yearFilled: boolean,
|};

class DateInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { value } = props;

    this.state = {
      date: value ? String(getDate(value)) : "",
      month: value ? String(getMonth(value)) : "",
      year: value ? String(getYear(value)) : "",
      dateFilled: false,
      monthFilled: false,
      yearFilled: false,
    };
  }

  getDateObject() {
    const { date, month, year } = this.state;

    if (date && month && year) {
      const d = Number(date);
      const m = Number(month);
      const y = Number(year);

      // only meaningful full year is allowed to not interpret 12 as 1912
      if (y < 1900) {
        return null;
      }

      const dateObject = new Date(y, m, d);

      // date has to be valid day of month
      if (dateObject > endOfMonth(new Date(y, m))) {
        return null;
      }

      return dateObject;
    }

    return null;
  }

  getDefaultError = () => {
    const { date, month, year, dateFilled, monthFilled, yearFilled } = this.state;

    if (!(dateFilled && monthFilled && yearFilled)) {
      return null;
    }

    if (date && month && year) {
      const value = this.getDateObject();
      if (!isValid(value)) {
        return errors.invalidDate;
      }
    }

    return null;
  };

  updateDate = () => {
    const { onChange } = this.props;
    const date = this.getDateObject();

    onChange(isValid(date) ? date : null);
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = ev.target;
    const fieldName = ev.target.name;

    if (fieldName === "date") {
      this.setState({ date: value }, this.updateDate);
    } else if (fieldName === "month") {
      this.setState({ month: value }, this.updateDate);
    } else {
      this.setState({ year: value }, this.updateDate);
    }
  };

  handleBlur = (ev: SyntheticInputEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = ev.target.name;

    if (fieldName === "date") {
      this.setState({ dateFilled: true });
    } else if (fieldName === "month") {
      this.setState({ monthFilled: true });
    } else {
      this.setState({ yearFilled: true });
    }
  };

  render() {
    const { label, error } = this.props;
    const { date, month, year } = this.state;
    const errorMessage = error || this.getDefaultError();

    return (
      <IntlConsumer>
        {intl => (
          <InputGroup
            error={errorMessage && intl.translate(errorMessage)}
            label={intl.translate(label)}
            flex={["0 0 60px", "1 1 100%", "0 0 90px"]}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            dataTest="DateInput"
          >
            <InputField
              name="date"
              placeholder={intl.translate(__("account.date_input.date_placeholder"))}
              type="number"
              value={date}
              dataTest="DateInput-Date"
            />
            <Select
              name="month"
              options={months.map((monthLabel, i) => ({
                value: i,
                label: intl.translate(monthLabel),
              }))}
              placeholder={intl.translate(__("account.date_input.select_month_placeholder"))}
              value={month}
              dataTest="DateInput-Month"
            />
            <InputField
              name="year"
              placeholder={intl.translate(__("account.date_input.year_placeholder"))}
              type="number"
              value={year}
              dataTest="DateInput-Year"
            />
          </InputGroup>
        )}
      </IntlConsumer>
    );
  }
}

export default DateInput;
