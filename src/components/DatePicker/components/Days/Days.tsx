import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import setDate from "date-fns/setDate";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";

import getMonthDays from "../../services/getMonthDays";
import DayWrapper from "../../primitives/Day";

type Props = {
  value: Date,
  viewing: Date,
  min: Date,
  max: Date,
  onSelect: (day: number) => void,
};

const Days = ({ value, viewing, min, max, onSelect }: Props): React.ReactNode[] =>
  getMonthDays({ date: viewing }).map(week => (
    <Stack justify="between" spaceAfter="small" spacing="extraTight">
      {week.map((day, i) => {
        const date = setDate(viewing, Number(day));
        const today = isSameDay(date, new Date());
        const active = isSameDay(date, value);

        const ok = isWithinInterval(date, { start: min, end: max });

        return (
          <DayWrapper
            key={i} // eslint-disable-line react/no-array-index-key
            disabled={!ok || day === }
            hidden={day === }
            onClick={() => onSelect(Number(day))}
            active={active}
          >
            <Text
              size="large"
              type={(today && !active && "info") || (active && "white") || "primary"}
              weight="bold"
            >
              {day}
            </Text>
          </DayWrapper>
        );
      })}
    </Stack>
  ));

export default Days;
