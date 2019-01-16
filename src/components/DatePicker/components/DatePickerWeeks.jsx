// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import getDay from "date-fns/getDay";

import DayFormat from "../../Day";
import DayWrapper from "../primitives/Day";
import { getWeekDays } from "../services/getMonthDays";

type Props = {|
  value: Date,
|};

const DatePickerWeeks = ({ value }: Props): React.Node => (
  <Stack align="center" justify="between" spaceAfter="medium">
    {getWeekDays(value).map(weekDay => {
      const weekends = getDay(weekDay) === 6 || getDay(weekDay) === 0;
      return (
        <DayWrapper key={weekDay} color={weekends ? "product" : "dark"}>
          <DayFormat format="iii" date={weekDay} />
        </DayWrapper>
      );
    })}
  </Stack>
);
export default DatePickerWeeks;
