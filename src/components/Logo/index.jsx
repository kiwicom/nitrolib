// @flow strict
import React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { logo } from "../../styles";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import SvgLogo from "./SvgLogo";

const PoweredByKiwi = styled.span`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  position: relative;
  font-size: 10px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
  margin-${/* sc-custom "left" */ left}: 7px;
  padding-${/* sc-custom "left" */ left}: 7px;

  &:before {
    content: "";
    top: 0;
    bottom: 0;
    ${/* sc-custom "left" */ left}: 0;
    margin: auto;
    position: absolute;
    width: 2px;
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLighter};
    height: 30px;
  }

  ${mq.largeMobile(css`
    font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
    margin-${/* sc-custom "left" */ left}: 10px;
    padding-${/* sc-custom "left" */ left}: 10px;
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  `)};
`;

PoweredByKiwi.defaultProps = {
  theme: themeDefault,
};

const LogoLinkStyled = styled.a`
  display: flex;
`;

const LogoStyled = styled.img`
  display: none;
  ${mq.largeMobile(css`
    display: block;
    max-height: 35px;
    max-width: 140px;
    align-self: center;
  `)};
`;

LogoStyled.defaultProps = {
  theme: themeDefault,
};

const LogoStyledMobile = styled.img`
  max-height: 40px;
  max-width: 40px;
  align-self: center;

  ${mq.largeMobile(css`
    display: none;
  `)};
`;

LogoStyledMobile.defaultProps = {
  theme: themeDefault,
};

const Link = styled.a`
  display: flex;
  ${({ hiddenDefault }) => hiddenDefault && `width: 0px; opacity: 0;`};
`;

const logoBaseUrl = "https://images.kiwi.com/whitelabels";

type Props = {|
  id: string,
  languageId: string,
  redirectUrl: string,
  title: string,
  poweredByKiwi: boolean,
  inverted?: boolean,
  hiddenDefault?: boolean,
  onClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
|};

export const Logo = ({
  id,
  redirectUrl,
  title,
  poweredByKiwi,
  languageId,
  inverted,
  hiddenDefault,
  onClick,
}: Props) =>
  id === "kiwicom" ? (
    <Link
      data-test="Logo"
      animation="Logo"
      href={`${redirectUrl}${languageId}/`}
      onClick={onClick}
      hiddenDefault={hiddenDefault}
    >
      <SvgLogo height={logo.height} width={logo.width} title={title} inverted={inverted} />
    </Link>
  ) : (
    <>
      <LogoLinkStyled data-test="Logo" href={`${redirectUrl}${languageId}/`} onClick={onClick}>
        <LogoStyled
          title={title}
          alt={title}
          srcSet={`${logoBaseUrl}/0x80/${id}.png?v=1 2x`}
          src={`${logoBaseUrl}/0x40/${id}.png?v=1`}
        />
        <LogoStyledMobile
          title={title}
          alt={title}
          srcSet={`${logoBaseUrl}/0x80/${id}-mobile.png?v=1 2x`}
          src={`${logoBaseUrl}/0x40/${id}-mobile.png?v=1`}
        />
      </LogoLinkStyled>
      {poweredByKiwi && (
        <PoweredByKiwi>
          Powered by <br /> Kiwi.com
        </PoweredByKiwi>
      )}
    </>
  );

export default Logo;
