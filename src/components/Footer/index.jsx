// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Linkedin from "@kiwicom/orbit-components/lib/icons/Linkedin";
import Twitter from "@kiwicom/orbit-components/lib/icons/Twitter";
import Instagram from "@kiwicom/orbit-components/lib/icons/Instagram";
import Facebook from "@kiwicom/orbit-components/lib/icons/Facebook";

import mq from "../../styles/mq";
import Text from "../Text";
import { Consumer as IntlConsumer } from "../../services/intl/context";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import LogoSVG from "./components/LogoSvg";
import { getLinks } from "./services/menu";

const ICONS = [
  {
    id: "ig",
    component: <Instagram color="tertiary" />,
    url: `https://www.instagram.com/kiwicom247/`,
  },
  {
    id: "tw",
    component: <Twitter color="tertiary" />,
    url: `https://twitter.com/kiwicom247/`,
  },
  {
    id: "li",
    component: <Linkedin color="tertiary" />,
    url: `https://www.linkedin.com/company/Kiwi.com/`,
  },
  {
    id: "fb",
    component: <Facebook color="tertiary" />,
    url: `https://www.facebook.com/kiwicom247/`,
  },
];

const Wrapper = styled.div`
  ${({ theme }: ThemeProps) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.orbit.paletteWhite};
    border-top: 2px solid ${theme.orbit.paletteCloudLight};
    padding: ${theme.orbit.spaceLarge};

    ${mq.gtTablet(css`
      flex-direction: row;
      padding: 40px 50px;
    `)};
  `};
`;
Wrapper.defaultProps = {
  theme: themeDefault,
};

const LogoWrapper = styled.div`
  margin: 0 0 40px 0;

  ${mq.gtTablet(css`
    margin: 0 50px 0 0;
  `)};
`;

const Logo = styled(LogoSVG)`
  vertical-align: middle;
`;

const LinksAndIconsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;

  ${mq.gtDesktop(css`
    flex-direction: row;
    align-items: center;
  `)};
  ${mq.ltTablet(css`
    align-items: center;
  `)};
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  ${mq.gtTablet(css`
    margin: 0;
    flex-direction: row;

    ${mq.ltDesktop(css`
      margin-top: 24px;
    `)};
  `)};
`;

const Link = styled.a`
  text-decoration: none;

  &:not(:last-child) {
    ${mq.ltTablet(
      css`
        margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
      `,
    )};
    ${mq.gtTablet(
      css`
        margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
      `,
    )};
  }
`;
Link.defaultProps = {
  theme: themeDefault,
};

const Icons = styled.div`
  margin-left: auto;

  ${mq.gtTablet(css`
    ${mq.ltDesktop(css`
      order: -1;
    `)};
  `)};
`;

const IconsLink = styled.a`
  :not(:last-child) {
    margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  }
`;

IconsLink.defaultProps = {
  theme: themeDefault,
};

const Footer = () => (
  <IntlConsumer>
    {({ language }) => (
      <Wrapper>
        <LogoWrapper>
          <a href={`https://www.kiwi.com/${language.id}/`}>
            <Logo />
          </a>
        </LogoWrapper>
        <LinksAndIconsWrapper>
          <LinksWrapper>
            {getLinks(language.id).map(link => (
              <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
                <Text t={link.title} type="secondary" />
              </Link>
            ))}
          </LinksWrapper>
          <Icons>
            {ICONS.map(icon => (
              <IconsLink href={icon.url} key={icon.id} target="_blank" rel="noopener noreferrer">
                {icon.component}
              </IconsLink>
            ))}
          </Icons>
        </LinksAndIconsWrapper>
      </Wrapper>
    )}
  </IntlConsumer>
);

export default Footer;
