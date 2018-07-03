// @flow strict
import * as React from "react";
import styled from "styled-components";

import ClientOnly from "public/components/ClientOnly";
import type { ThemeProps } from "public/records/Brand";
import Flex from "public/primitives/Flex";
import { navbar } from "public/styles/index";
import mq from "public/styles/mediaQuery";
import SideBar from "./scenes/SideBar";
import Logo from "./components/Logo";
import Language from "./components/Language";
import Currency from "./components/Currency";

const Container = styled(Flex)`
  width: 100%;
  height: ${navbar.height}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.white};
  color: ${({ theme }: ThemeProps) => theme.colors["neutral-800"]};
  padding: 0 10px;
  box-sizing: border-box;

  ${mq.gtTablet`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  `};
`;

const NavBar = () => (
  <Container x="space-between" y="center">
    <Logo />
    <Flex y="center">
      <Language />
      <ClientOnly>
        <Currency />
      </ClientOnly>
      <SideBar />
    </Flex>
  </Container>
);

export default NavBar;
