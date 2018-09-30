// @flow strict
import React from "react";
import styled, { css } from "styled-components";

import { logo } from "../../../../styles";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import SvgLogo from "./SvgLogo";
import * as rtl from "../../../../styles/rtl";
import mq from "../../../../styles/mq";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  position: relative;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  margin-${rtl.left}: 10px;
  padding-${rtl.left}: 10px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  &:before {
    content: "";
    top: 0;
    bottom: 0;
    ${rtl.left}: 0;
    margin: auto;
    position: absolute;
    width: 2px;
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLighter};
    height: 30px;
  }

  ${mq.ltTablet(css`
    font-size: 10px;
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};;
    margin-${rtl.left}: 7px;
    padding-${rtl.left}: 7px;
  `)};
`;

PoweredByKiwi.defaultProps = {
  theme: themeDefault,
};

const LogoLinkStyled = styled.a`
  display: flex;
`;

const LogoStyled = styled.img`
  max-height: 35px;
  max-width: 140px;
  align-self: center;
  ${mq.ltTablet(css`
    display: none;
  `)};
`;

const LogoStyledMobile = styled.img`
  display: none;
  max-height: 40px;
  max-width: 40px;
  align-self: center;

  ${mq.ltTablet(css`
    display: block;
  `)};
`;

const Link = styled.a`
  display: flex;
`;

const logoBaseUrl = "https://images.kiwi.com/whitelabels";

const Logo = () => (
  <BrandConsumer>
    {({ id, home_redirect_url, name, powered_by_kiwi }) =>
      id === "kiwicom" ? (
        <Link href={home_redirect_url}>
          <SvgLogo height={logo.height} width={logo.width} title={name} />
        </Link>
      ) : (
        <>
          <LogoLinkStyled href={home_redirect_url}>
            <LogoStyled
              title={name}
              alt={name}
              srcSet={`${logoBaseUrl}/0x80/${id}.png?v=1 2x`}
              src={`${logoBaseUrl}/0x40/${id}.png?v=1`}
            />
            <LogoStyledMobile
              title={name}
              alt={name}
              srcSet={`${logoBaseUrl}/0x80/${id}-mobile.png?v=1 2x`}
              src={`${logoBaseUrl}/0x40/${id}-mobile.png?v=1`}
            />
          </LogoLinkStyled>
          {powered_by_kiwi && (
            <PoweredByKiwi>
              Powered by <br /> Kiwi.com
            </PoweredByKiwi>
          )}
        </>
      )
    }
  </BrandConsumer>
);

export default Logo;
