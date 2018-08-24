// @flow strict
import React from "react";
import styled from "styled-components";

import { logo } from "../../../../styles";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import SvgLogo from "./SvgLogo";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  position: relative;
  font-size: 13px;
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
    height: 30px;
  }
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
            <Link href={brand.home_redirect_url}>
              <img
                title={brand.name}
                alt={brand.name}
                srcSet={`${logoBaseUrl}/0x80/${brand.id}.png?v=1 2x`}
                src={`${logoBaseUrl}/0x40/${brand.id}.png?v=1`}
              />
            </Link>
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
