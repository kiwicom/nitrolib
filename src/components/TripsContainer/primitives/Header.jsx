// @flow
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type HeaderProps = {|
  ...ThemeProps,
  mobile: boolean,
|};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  ${({ theme, mobile }: HeaderProps) =>
    !mobile &&
    `
    height: 40px;
    box-shadow: ${theme.orbit.boxShadowElevatedLevel1};
    background: ${theme.orbit.paletteWhite};
  `};
  z-index: 2;
`;

Header.defaultProps = {
  theme: themeDefault,
  mobile: false,
};

export default Header;
