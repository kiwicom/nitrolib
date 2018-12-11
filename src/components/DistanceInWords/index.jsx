// @flow strict
import * as React from "react";
import formatDistance from "date-fns/formatDistance";
import * as locales from "date-fns/locale";

import { Consumer } from "../../services/intl/context";

type Props = {|
  to: Date | string,
  from?: Date,
|};

const DistanceInWords = (props: Props) => (
  <Consumer>
    {intl =>
      formatDistance(props.from || Date.now(), props.to, {
        locale: locales[intl.language.locations] || locales.enUS,
      })
    }
  </Consumer>
);

export default DistanceInWords;
