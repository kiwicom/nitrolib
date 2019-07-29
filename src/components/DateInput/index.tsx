
import * as React from "react";
import Select from "@kiwicom/orbit-components/lib/Select";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

import months from "../../records/Months";
import { Consumer as IntlConsumer } from "../../services/intl/context";

type Props = {
  label: string,
  value: ?Date,
  error?: string,
  onChange: (?Date) => void,
};

type State = {
  date: string,
  month: string,
  year: string,
};

class DateInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { value } = props;

    this.state = {
      date: value ? String(getDate(value)) : ,
      month: value ? String(getMonth(value)) : ,
      year: value ? String(getYear(value)) : ,
    };
  }

  maybeUpdateDate = () => {
    const { date, month, year } = this.state;
    const { onChange } = this.props;

    if (date && month && year) {
      onChange(new Date(Number(year), Number(month), Number(date)));
    } else {
      onChange(null);
    }
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = ev.target;
    const fieldName = ev.target.name;

    if (fieldName === "date") {
      this.setState({ date: value }, this.maybeUpdateDate);
    } else if (fieldName === "month") {
      this.setState({ month: value }, this.maybeUpdateDate);
    } else {
      this.setState({ year: value }, this.maybeUpdateDate);
    }
  };

  render() {
    const { label, error } = this.props;
    const { date, month, year } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <InputGroup
            error={error && intl.translate(error)}
            onChange={this.handleChange}
            label={intl.translate(label)}
            flex={["0 0 60px", "1 1 100%", "0 0 90px"]}
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
