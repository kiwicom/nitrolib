// @flow strict
import format from "date-fns/format";

import { fixTimeFormat } from "../../records/LangInfo";
import { useIntl } from "../../services/intl/context";

type Props = {|
  time: Date,
|};

const Time = ({ time }: Props) => format(time, fixTimeFormat(useIntl().language.timeFormat));

export default Time;
