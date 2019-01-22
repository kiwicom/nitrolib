// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";
import styled from "styled-components";

import calculateRanges from "../../../../services/dates/calculateRanges";
import CalendarWrapper from "../../primitives/DatePickerWrapper";
import Weeks from "../Weeks/index";
import Days from "../Days/Days";
import Months from "../Months/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const CalendarTop = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  padding: 0 ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  display: flex;
  height: 40px;
`;

CalendarTop.defaultProps = {
  theme: themeDefault,
};

const CalendarContent = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall}
    ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
`;

CalendarContent.defaultProps = {
  theme: themeDefault,
};

const Arrow = styled.div`
  cursor: pointer;
`;

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
    <CalendarWrapper>
      <CalendarTop>
        <Stack align="center" flex justify="between">
          <Arrow onClick={decrease}>
            <ChevronLeft size="large" color="secondary" />
          </Arrow>
          <Months months={months} viewing={viewing} />
          <Arrow onClick={increase}>
            <ChevronRight size="large" color="secondary" />
          </Arrow>
        </Stack>
      </CalendarTop>
      <CalendarContent>
        <Weeks value={value} />
        <Days value={value} viewing={viewing} onSelect={onSelect} />
      </CalendarContent>
    </CalendarWrapper>
  );
};

export default Calendar;
