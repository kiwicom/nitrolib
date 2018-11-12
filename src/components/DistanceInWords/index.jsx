// @flow strict
import * as React from "react";
import formatDistance from "date-fns/formatDistance";
import * as locales from "date-fns/locale";

import { Consumer } from "../../services/intl/context";

type Props = {|
  time: Date | string,
|};

const DistanceInWords = (props: Props) => (
  <Consumer>
    {intl =>
      formatDistance(Date.now(), props.time, {
        locale: locales[intl.language.locations] || locales.enUS,
      })
    }
  </Consumer>
);

export default DistanceInWords;
