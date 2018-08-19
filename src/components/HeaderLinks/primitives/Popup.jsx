// @flow
import styled from "styled-components";

import { themeDefault } from "records/Theme";
import type { ThemeProps } from "records/Theme";

const Popup = styled.div`
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  margin: 12px;
  border: 0;
  box-shadow: 0 6px 16px 0 rgba(45, 53, 59, 0.22), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  overflow: hidden;
  width: 95%;
  min-width: 230px;
  box-sizing: border-box;
  padding: 20px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  user-select: none;
  min-height: 100px;
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
