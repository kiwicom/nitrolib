// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import getMonthDays from "../services/getMonthDays";
import DayWrapper from "../primitives/Day";

type Props = {|
  value: Date,
  date: Date,
  onSelect: (date: Date, day: string | number) => void,
|};

const DatePickerDays = ({ date, onSelect, value }: Props): React.Node[] =>
  getMonthDays({ date }).map(week => (
    <Stack justify="between" spaceAfter="small">
      {week.map(day => (
        <DayWrapper hover onClick={() => onSelect(date, day)} active={day === value}>
          <Text size="large" type="primary">
            {day}
          </Text>
        </DayWrapper>
      ))}
    </Stack>
  ));

export default DatePickerDays;
