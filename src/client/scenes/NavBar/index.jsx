// @flow strict
import * as React from "react";
import styled from "styled-components";

import Flex from "client/primitives/Flex";
import { NAVBAR_HEIGHT, LOGO_WIDTH, LOGO_HEIGHT } from "client/consts/layout";
import mq from "client/services/utils/mediaQuery";
import type { ThemeProps } from "client/records/Brand";
import Logo from "./components/Logo";
import Language from "./components/Language";

const Container = styled(Flex)`
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.white};
  color: ${(props: ThemeProps) => props.theme.colors["neutral-800"]};
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
    <Logo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    <Flex y="center">
      <Language />
    </Flex>
  </Container>
);

export default NavBar;
