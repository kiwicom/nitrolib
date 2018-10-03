// @flow
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 40px;
  overflow: hidden;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  z-index: 2;
`;

Header.defaultProps = {
  theme: themeDefault,
};

export default Header;
