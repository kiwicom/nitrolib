// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type ActiveProps = ThemeProps & {|
  active: boolean,
  disabled: boolean,
|};

const Day = styled.div`
  ${({ active, theme }: ActiveProps) => active && `background: ${theme.orbit.paletteBlueNormal}`};
  height: 50px;
  width: 50px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? `initial` : `pointer`)};
  &:hover {
    background: ${({ theme, disabled, active }: ActiveProps) =>
      (!disabled && !active && theme.orbit.paletteCloudLightHover) ||
      (active && theme.orbit.paletteBlueNormal) ||
      `none`};
  }
`;

Day.defaultProps = {
  theme: themeDefault,
};

export default Day;
