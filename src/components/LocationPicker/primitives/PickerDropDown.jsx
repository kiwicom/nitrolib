// @flow strict
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

const DropDown = styled.div`
  width: 100%;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  max-height: 215px;
  box-sizing: border-box;
  overflow-y: scroll;
  z-index: 2;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.16), 0 1px 32px rgba(0, 0, 0, 0.32);
  opacity: 1;
  top: 50px;
`;

DropDown.defaultProps = {
  theme: themeDefault,
};

export default DropDown;
