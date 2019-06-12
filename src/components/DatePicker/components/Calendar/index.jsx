// @flow strict
import * as React from "react";
import styled from "styled-components";
import getMonth from "date-fns/getMonth";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";

import Weeks from "../Weeks";
import Days from "../Days/Days";
import Months from "../Months";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const CalendarTop = styled.div`
  margin-top: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  display: flex;
  height: 40px;
`;

CalendarTop.defaultProps = {
  theme: themeDefault,
};

const Arrow = styled.div`
  cursor: pointer;
  background: #e8edf1;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
`;

Arrow.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  value: Date,
  viewing: Date,
  min: Date,
  max: Date,
  onSelect: (day: number) => void,
  onDecrease: () => void,
  onIncrease: () => void,
|};

const Calendar = ({ value, viewing, min, max, onSelect, onDecrease, onIncrease }: Props) => (
  <>
    <CalendarTop>
      <Stack align="center" flex justify="between">
        <Arrow onClick={onDecrease}>
          <ChevronLeft size="small" color="secondary" />
        </Arrow>
        <Months month={getMonth(viewing)} viewing={viewing} />
        <Arrow onClick={onIncrease}>
          <ChevronRight size="small" color="secondary" />
        </Arrow>
      </Stack>
    </CalendarTop>
    <Weeks value={viewing} />
    <Days value={value} viewing={viewing} min={min} max={max} onSelect={onSelect} />
  </>
);

export default Calendar;
