// @flow
import styled from "styled-components";

import type { ThemeProps } from "records/Theme";
import { themeDefault } from "records/Theme";

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

Header.defaultProps = {
  theme: themeDefault,
};

export default Header;
