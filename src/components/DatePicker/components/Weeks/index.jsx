// @flow strict
import * as React from "react";
import getDay from "date-fns/getDay";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import DayFormat from "../../../Day/index";
import DayWrapper from "../../primitives/Day";
import { getWeekDays } from "../../services/getMonthDays";

type Props = {|
  value: Date,
|};

const Weeks = ({ value }: Props): React.Node => (
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

export default Weeks;
