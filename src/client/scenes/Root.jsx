// @flow strict
import React from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import NavBar from "client/scenes/NavBar";
import SearchForm from "client/scenes/SearchForm";
import CookiesConsent from "client/components/CookiesConsent";
import ClientOnly from "client/components/ClientOnly";
import Title from "client/scenes/Root/components/Title";
import ExploreLink from "client/scenes/Root/components/ExploreLink";

import mq from "client/services/utils/mediaQuery";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  ${mq.gtTablet`
    justify-content: flex-start;
  `};
`;

const CookiesConsentContainer = styled.div`
  order: -1;

  ${mq.gtTablet`
    order: 0;
  `};
`;

const Root = () => (
  <Container>
    <NavBar />
    <MainContent>
      <Title />
      <SearchForm />
      <ExploreLink />
    </MainContent>
    <ClientOnly>
      <CookiesConsentContainer>
        <CookiesConsent />
      </CookiesConsentContainer>
    </ClientOnly>
  </Container>
);

// eslint-disable-next-line no-undef
export default hot(module)(Root);
