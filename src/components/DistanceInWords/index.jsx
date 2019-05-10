// @flow strict
import * as React from "react";
import formatDistance from "date-fns/formatDistance";

import DateFnsLocale from "../DateFnsLocale";
import { Consumer } from "../../services/intl/context";

type Props = {|
  to: Date,
  from?: Date,
|};

const DistanceInWords = ({ from = new Date(), to }: Props) => (
  <Consumer>
    {({ getLocale }) => (
      <DateFnsLocale getLocale={getLocale}>
        {locale => formatDistance(from, to, { locale })}
      </DateFnsLocale>
    )}
  </Consumer>
);

export default DistanceInWords;
