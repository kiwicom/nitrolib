// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";
import styled from "styled-components";

import calculateRanges from "../../InputDate/services/calculateRanges";
import DatePickerWrapper from "../primitives/DatePickerWrapper";
import DatePickerWeeks from "./DatePickerWeeks";
import DatePickerDays from "./DatePickerDays";
import DatePickerMonths from "./DatePickerMonths";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type Props = {|
  value: Date,
  min: Date,
  max: Date,
  date: Date,
  onSelect: (date: Date, day: number | string) => void,
  decrease: () => void,
  increase: () => void,
|};

const DatePickerTop = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  padding: 0 ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  display: flex;
  height: 40px;
`;

DatePickerTop.defaultProps = {
  theme: themeDefault,
};

const DatePickerContent = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall}
    ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
`;

DatePickerContent.defaultProps = {
  theme: themeDefault,
};

const Arrow = styled.div`
  cursor: pointer;
`;

const DatePicker = ({ value, min, max, onSelect, decrease, increase, date }: Props) => {
  const { months } = calculateRanges(min, max, value);
  return (
    <DatePickerWrapper>
      <DatePickerTop>
        <Stack align="center" flex justify="between">
          <Arrow onClick={decrease}>
            <ChevronLeft size="large" color="secondary" />
          </Arrow>
          <DatePickerMonths months={months} date={date} />
          <Arrow onClick={increase}>
            <ChevronRight size="large" color="secondary" />
          </Arrow>
        </Stack>
      </DatePickerTop>
      <DatePickerContent>
        <DatePickerWeeks value={value} />
        <DatePickerDays onSelect={onSelect} date={date} value={value} />
      </DatePickerContent>
    </DatePickerWrapper>
  );
};

export default DatePicker;
