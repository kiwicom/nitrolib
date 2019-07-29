
import styled from "styled-components";

import { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  overflow: hidden;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  padding: 0 20px;
  z-index: 2;
`;

Header.defaultProps = {
  theme: themeDefault,
};

export default Header;
