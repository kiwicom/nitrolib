// @flow strict
import styled, { css } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import button from "../../../styles/mixins/button";

type ActiveProps = {|
  ...ThemeProps,
  hidden: boolean,
  disabled: boolean,
  active: boolean,
|};

const Day = styled.button`
  ${button};
  ${({ active, theme }: ActiveProps) => active && `background: ${theme.orbit.paletteBlueNormal}`};
  height: 50px;
  width: 50px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? `initial` : `pointer`)};
  opacity: ${({ disabled, hidden }: ActiveProps) => (hidden && "0") || (disabled && "0.5") || "1"};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background: ${({ theme, active }: ActiveProps) =>
          active ? theme.orbit.paletteBlueNormal : theme.orbit.paletteCloudLightHover};
      }
    `}
`;

Day.defaultProps = {
  theme: themeDefault,
};

export default Day;
