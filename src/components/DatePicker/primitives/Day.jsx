// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type ActiveProps = ThemeProps & {|
  active: boolean,
  today: boolean,
  hover: boolean,
  color: "white" | "dark" | "product",
|};

const Day = styled.div`
  color: ${({ color, theme }: ActiveProps) =>
    (color === "white" && theme.orbit.paletteWhite) ||
    (color === "dark" && theme.orbit.paletteInkDark) ||
    (color === "product" && theme.orbit.paletteProductNormal)};
  ${({ active, theme }: ActiveProps) =>
    active && `background: ${theme.orbit.paletteProductNormal}`};
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  cursor: pointer;
  &:hover {
    background: ${({ theme, hover }: ActiveProps) =>
      hover ? theme.orbit.paletteCloudLightHover : theme.orbit.paletteWhite};
  }
`;

Day.defaultProps = {
  theme: themeDefault,
};

export default Day;
