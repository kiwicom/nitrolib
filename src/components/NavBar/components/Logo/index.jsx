// @flow strict
import React from "react";
import styled, { css } from "styled-components";

import { logo } from "../../../../styles";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import SvgLogo from "./SvgLogo";
import mq from "../../../../styles/mediaQuery";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  position: relative;
  font-size: 12px;
  margin-left: 10px;
  padding-left: 10px;
  font-weight: 500;
  &:before {
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    width: 2px;
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLighter};
    height: 30px;
  }

  ${mq.ltTablet(css`
    font-size: 10px;
    font-weight: 400;
    margin-left: 7px;
    padding-left: 7px;
  `)};
`;

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

PoweredByKiwi.defaultProps = {
  theme: themeDefault,
};

const logoBaseUrl = "https://images.kiwi.com/whitelabels";

const Logo = () => (
  <BrandConsumer>
    {brand => (
      <>
        {brand.id === "kiwicom" ? (
          <Link href={brand.home_redirect_url}>
            <SvgLogo height={logo.height} width={logo.width} title={brand.name} />
          </Link>
        ) : (
          <>
            <LogoLinkStyled href={brand.home_redirect_url}>
              <LogoStyled
                title={brand.name}
                alt={brand.name}
                srcSet={`${logoBaseUrl}/0x80/${brand.id}.png?v=1 2x`}
                src={`${logoBaseUrl}/0x40/${brand.id}.png?v=1`}
              />
              <LogoStyledMobile
                title={brand.name}
                alt={brand.name}
                srcSet={`${logoBaseUrl}/0x80/${brand.id}-mobile.png?v=1 2x`}
                src={`${logoBaseUrl}/0x40/${brand.id}-mobile.png?v=1`}
              />
            </LogoLinkStyled>
            {brand.powered_by_kiwi && (
              <PoweredByKiwi>
                Powered by <br /> Kiwi.com
              </PoweredByKiwi>
            )}
          </>
        )}
      </>
    )}
  </BrandConsumer>
);

export default Logo;
