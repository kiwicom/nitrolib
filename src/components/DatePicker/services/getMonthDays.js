// @flow strict
import endOfMonth from "date-fns/endOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import startOfMonth from "date-fns/startOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import format from "date-fns/format";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfISOWeek from "date-fns/endOfISOWeek";
import startOfISOWeek from "date-fns/startOfISOWeek";

export const getWeekDays = (date: Date) =>
  eachDayOfInterval({
    start: startOfISOWeek(date),
    end: endOfISOWeek(date),
  });

type Params = {|
  date: Date,
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
|};

const getMonthDays = ({ date, weekStart }: Params): Array<Array<string | number>> => {
  const getDate = new Date(getYear(date), getMonth(date));
  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(getDate),
      end: endOfMonth(getDate),
    },
    { weekStartsOn: weekStart || 1 },
  );

  const weekDays = weeks.map(weekDay => getWeekDays(weekDay));

  return weekDays.map(days => days.map(day => (isSameMonth(date, day) ? format(day, "d") : "")));
};

export default getMonthDays;
