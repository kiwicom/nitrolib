// @flow
import styled, { css } from "styled-components";

import mq from "../../../styles/mq";
import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type Width = {|
  width: string,
  positionMenuTablet: number,
  positionMenuDesktop: number,
|};

const Popup = styled.div`
  position: absolute;
  top: 55px;
  min-width: ${({ width }: Width) => width || `550px`};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  cursor: default;
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
    min-width: 100%;
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
