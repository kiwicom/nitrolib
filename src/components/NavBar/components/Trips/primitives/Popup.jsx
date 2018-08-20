// @flow
import styled, { css } from "styled-components";

import mq from "../../../../../styles/mediaQuery";
import type { ThemeProps } from "../../../../../records/Theme";
import { themeDefault } from "../../../../../records/Theme";

const Popup = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  min-width: 320px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  border-radius: 3px;
  cursor: default;
  width: 100%;
  z-index: 50;
  min-height: 450px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);

  ${mq.gtTablet(css`
    right: 0;
    font-size: 14px;
    width: auto;
    min-height: 220px;
    width: 450px;
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
