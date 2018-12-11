// @flow strict
import * as React from "react";
import format from "date-fns/format";
import * as locales from "date-fns/locale";
import addSeconds from "date-fns/addSeconds";
import differenceInSeconds from "date-fns/differenceInSeconds";

import { Consumer } from "../../services/intl/context";

type Props = {
  to: Date,
  from: Date,
  format: string,
};

const Duration = (props: Props) => {
  const { from, to } = props;
  const date = addSeconds(new Date(0), differenceInSeconds(from, to));
  return (
    <Consumer>
      {intl =>
        format(date, props.format || intl.language.durationFormat, {
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
