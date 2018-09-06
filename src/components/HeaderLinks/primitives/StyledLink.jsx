// @flow
import styled, { css } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import mq from "../../../styles/mediaQuery";
import * as rtl from "../../../styles/rtl";

type LinkProps = {|
  ...ThemeProps,
  active: boolean,
|};

const StyledLink = styled.a`
  color: ${({ active, theme }: LinkProps) =>
    active ? theme.orbit.paletteProductNormal : theme.orbit.paletteInkNormal};
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  margin-${rtl.left}: 20px;
  height: 50px;
  line-height: 50px;

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }

  ${mq.mobile(css`
    margin-${rtl.left}: 0;
    padding-${rtl.left}: 10px;
    font-size: 16px;
    font-weight: 400;
    i {
      padding-${rtl.right}: 10px;
    }
  `)};
`;

StyledLink.defaultProps = {
  theme: themeDefault,
};

export default StyledLink;
