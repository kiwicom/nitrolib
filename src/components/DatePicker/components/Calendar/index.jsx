// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";
import styled from "styled-components";

import calculateRanges from "../../../../services/dates/calculateRanges";
import Weeks from "../Weeks/index";
import Days from "../Days/Days";
import Months from "../Months/index";
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
  decrease: () => void,
  increase: () => void,
|};

const Calendar = ({ value, viewing, min, max, onSelect, decrease, increase }: Props) => {
  const { months } = calculateRanges(min, max, value);

  return (
    <>
      <CalendarTop>
        <Stack align="center" flex justify="between">
          <Arrow onClick={decrease}>
            <ChevronLeft size="small" color="secondary" />
          </Arrow>
          <Months months={months} viewing={viewing} />
          <Arrow onClick={increase}>
            <ChevronRight size="small" color="secondary" />
          </Arrow>
        </Stack>
      </CalendarTop>
      <Weeks value={viewing} />
      <Days value={value} viewing={viewing} onSelect={onSelect} />
    </>
  );
};

export default Calendar;
