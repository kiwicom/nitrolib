// @flow strict
import * as React from "react";
import dateFnsFormat from "date-fns/format";
import * as locales from "date-fns/locale";
import addSeconds from "date-fns/addSeconds";
import differenceInSeconds from "date-fns/differenceInSeconds";

import { fixDurationFormat } from "../../records/LangInfo";
import { Consumer } from "../../services/intl/context";

type Props = {
  to: Date,
  from: Date,
  format: string,
};

const Duration = ({ from, to, format }: Props) => {
  const date = addSeconds(new Date(0), differenceInSeconds(to, from));
  return (
    <Consumer>
      {intl =>
        dateFnsFormat(date, format || fixDurationFormat(intl.language.durationFormat), {
          locale: locales[intl.language.locations] || locales.enUS,
        })
      }
    </Consumer>
  );
};

Duration.defaultProps = {
  format: "",
};

export default Duration;
