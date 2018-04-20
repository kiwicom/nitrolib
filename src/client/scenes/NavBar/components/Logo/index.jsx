// @flow strict
import React from "react";
import styled from "styled-components";

import * as brandContext from "client/services/brand/context";
import type { ThemeProps } from "client/records/Brand";
import SvgLogo from "./SvgLogo";

const PoweredByKiwi = styled.span`
  color: ${(props: ThemeProps) => props.theme.colors["primary-600"]};
`;

const LogoImage = styled.img``;

type Props = {|
  width: number,
  height: number,
|};

const Logo = (props: Props) => (
  <brandContext.Consumer>
    {brand => {
      if (brand.id === "kiwicom")
        return (
          <a href={brand.home_redirect_url}>
            <SvgLogo height={props.height} width={props.width} title={brand.name} />
          </a>
        );
      return (
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
      );
    }}
  </brandContext.Consumer>
);

export default Logo;
