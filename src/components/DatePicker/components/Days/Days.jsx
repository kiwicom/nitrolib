// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import setDate from "date-fns/setDate";
import isSameDay from "date-fns/isSameDay";

import getMonthDays from "../../services/getMonthDays";
import DayWrapper from "../../primitives/Day";

type Props = {|
  value: Date,
  viewing: Date,
  onSelect: (day: number) => void,
|};

const DatePickerDays = ({ viewing, onSelect }: Props): React.Node[] =>
  getMonthDays({ date: viewing }).map(week => (
    <Stack justify="between" spaceAfter="small" spacing="extraTight">
      {week.map(day => {
        const today = isSameDay(setDate(viewing, +day), new Date());
        const active = isSameDay(setDate(viewing, +day), viewing);

        return (
          <DayWrapper
            disabled={!(day.length > 0)}
            onClick={day.length > 0 ? () => onSelect(Number(day)) : null}
            active={!today && active}
          >
            <Text
              size="large"
              type={(today && "info") || (active && "white") || "primary"}
              weight="bold"
            >
              {day}
            </Text>
          </DayWrapper>
        );
      })}
    </Stack>
  ));

export default DatePickerDays;
