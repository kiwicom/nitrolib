
import styled, { css } from "styled-components";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type Width = {
  width: string,
  positionMenuTablet: number,
  positionMenuDesktop: number,
};

const Popup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  max-width: ${({ width }: Width) => width || `550px`};
  width: 100%;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  cursor: default;
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};
  ${right}: 0;

  ${mq.largeMobile(css`
    ${right}: ${({ positionMenuTablet }) => `${positionMenuTablet}px`};
  `)};

  ${mq.desktop(css`
    ${right}: ${({ positionMenuDesktop }) => `${positionMenuDesktop}px`};
  `)};
`;

Popup.defaultProps = {
  theme: themeDefault,
};

export default Popup;
