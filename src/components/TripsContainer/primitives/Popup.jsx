// @flow
import styled, { css } from "styled-components";

import mq from "../../../styles/mediaQuery";
import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type Width = {|
  width: string,
  positionMenuTablet: string | number,
  positionMenuDesktop: string | number,
|};

const Popup = styled.div`
  position: absolute;
  top: 50px;
  min-width: ${({ width }: Width) => width || `550px`};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  cursor: default;
  width: 100%;
  z-index: 50;
  min-height: 450px;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};

  ${mq.gtDesktop(css`
    ${rtl.right}: ${({ positionMenuDesktop }) => `${positionMenuDesktop}px`};
  `)};

  ${mq.tablet(css`
    ${rtl.right}: ${({ positionMenuTablet }) => `${positionMenuTablet}px`};
  `)};

  ${mq.mobile(css`
    ${rtl.right}: 0;
    left: 0;
    font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
    min-height: 220px;
    width: 100%;
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
