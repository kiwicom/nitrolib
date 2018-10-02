// @flow
import styled, { css } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import mq from "../../../styles/mq";
import * as rtl from "../../../styles/rtl";

type LinkProps = {|
  ...ThemeProps,
  active: boolean,
|};

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  text-decoration: none;
  position: relative;
  cursor: pointer;
  margin-${rtl.left}: 20px;
  height: 50px;
  line-height: 50px;
  &:link, &:visited {
    color: ${({ active, theme }: LinkProps) =>
      active ? theme.orbit.paletteProductNormal : theme.orbit.paletteInkNormal};
  }

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }

  ${mq.mobile(css`
    margin-${rtl.left}: 0;
    padding-${rtl.left}: 10px;
    font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextLarge};
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
    i {
      padding-${rtl.right}: 10px;
    }
  `)};
`;

StyledLink.defaultProps = {
  theme: themeDefault,
};

export default StyledLink;
