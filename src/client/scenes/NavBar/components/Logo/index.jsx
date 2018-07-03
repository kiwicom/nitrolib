// @flow strict
import React from "react";
import styled from "styled-components";

import * as brandContext from "public/services/brand/context";
import type { ThemeProps } from "public/records/Brand";
import { logo } from "public/styles/index";
import SvgLogo from "./SvgLogo";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.colors["primary-600"]};
`;

const LogoImage = styled.img``;

const Logo = () => (
  <brandContext.Consumer>
    {brand =>
      brand.id === "kiwicom" ? (
        <a href={brand.home_redirect_url}>
          <SvgLogo height={logo.height} width={logo.width} title={brand.name} />
        </a>
      ) : (
        <>
          <a href={brand.home_redirect_url}>
            <LogoImage
              className={`NavbarLogo-link _${brand.id}`}
              title={brand.name}
              alt={brand.name}
              srcSet={`/images/logos/${brand.id}/navbar@2x.png?v=1 2x`}
              src={`/images/logos/${brand.id}/navbar.png?v=1`}
            />
          </a>
          {brand.powered_by_kiwi && <PoweredByKiwi>Powered by Kiwi.com</PoweredByKiwi>}
        </>
      )
    }
  </brandContext.Consumer>
);

export default Logo;
