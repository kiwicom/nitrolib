// @flow strict
import { css } from "styled-components";

import type { ThemeProps } from "../../records/Theme";

const linkMixin = css`
  a {
    text-decoration: none;
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
    color: ${({ theme }: ThemeProps) => theme.orbit.colorTextLinkPrimary};

    &:hover {
      color: ${({ theme }: ThemeProps) => theme.orbit.colorTextLinkPrimaryHover};
      text-decoration: underline;
    }
  }
`;

export default linkMixin;
