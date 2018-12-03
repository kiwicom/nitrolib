// @flow
import styled, { css } from "styled-components";
import { right, left } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../../styles/mq";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type LinkProps = {|
  ...ThemeProps,
  active: boolean,
  inverted: boolean,
|};

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  text-decoration: none;
  position: relative;
  cursor: pointer;
  margin-${left}: 20px;
  height: 50px;

  &:first-child {
    &:link, &:visited {
      color: ${({ theme, inverted }: LinkProps) =>
        inverted ? theme.orbit.paletteWhite : theme.orbit.paletteProductNormal};
    }
  }

  &:link, &:visited {
    color: ${({ active, theme, inverted }: LinkProps) =>
      inverted
        ? (active && theme.orbit.paletteWhiteActive) || theme.orbit.paletteWhite
        : (active && theme.orbit.paletteProductNormal) || theme.orbit.paletteInkNormal};
  }

  &:hover {
    &:link, &:visited {
      color: ${({ theme, inverted }: LinkProps) =>
        inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteProductNormal};
    }
  }

  ${mq.ltDesktop(css`
    margin-${left}: 0;
    padding-${left}: 10px;
    font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextLarge};
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
    &:first-child {
      &:link, &:visited {
        color: ${({ theme }: LinkProps) => theme.orbit.paletteProductNormal};
        i {
          color: ${({ theme }) => theme.orbit.paletteInkNormal};
        }
      }
    }

    &:link, &:visited {
      color: ${({ theme }: LinkProps) => theme.orbit.paletteInkNormal};
    }

    &:hover {
      &:link, &:visited {
        color: ${({ theme }: LinkProps) => theme.orbit.paletteProductNormal};
      }
      i {
        color: ${({ theme }) => theme.orbit.paletteInkNormal};
      }
    }
    i {
      padding-${right}: 10px;
    }
    `)}
`;

StyledLink.defaultProps = {
  theme: themeDefault,
};

export default StyledLink;
