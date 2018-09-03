// @flow
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

Header.defaultProps = {
  theme: themeDefault,
};

export default Header;
