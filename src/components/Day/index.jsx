// @flow strict
import * as React from "react";
import format from "date-fns/format";
import * as locales from "date-fns/locale";

import { fixDateFormat } from "../../records/LangInfo";
import { Consumer } from "../../services/intl/context";

type Props = {
  date: Date,
  format: string,
};

const Day = (props: Props) => (
  <Consumer>
    {intl =>
      format(props.date, props.format || fixDateFormat(intl.language.dateFormat), {
        locale: locales[intl.language.locations] || locales.enUS,
      })
    }
  </Consumer>
);

Day.defaultProps = {
  format: "",
};

export default Day;
