// @flow strict
import * as React from "react";
import format from "date-fns/format";

import { fixDateFormat } from "../../records/LangInfo";
import { Consumer } from "../../services/intl/context";
import DateFnsLocale from "../DateFnsLocale";

type Props = {
  date: Date,
  format: string,
  getLocale?: (id: string) => Promise<$FlowFixMe>,
};

const Day = (props: Props) => (
  <Consumer>
    {intl => (
      <DateFnsLocale id={intl.language.locations} getLocale={props.getLocale}>
        {locale =>
          format(props.date, props.format || fixDateFormat(intl.language.dateFormat), {
            locale,
          })
        }
      </DateFnsLocale>
    )}
  </Consumer>
);

Day.defaultProps = {
  format: "",
};

export default Day;
