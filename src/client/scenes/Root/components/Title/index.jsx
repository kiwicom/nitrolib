// @flow strict
import React from "react";
import styled from "styled-components";

import BrandName from "client/components/BrandName";
import Text from "client/components/Text";

import mq from "client/services/utils/mediaQuery";

const Container = styled.div`
  font-size 44px;
  margin 40px 20px 20px;
  display block;
  flex-shrink 0;

  ${mq.ltMiddleMobile`
    font-size 34px;
    margin 40px 10px 20px;
  `}

  ${mq.gtTablet`
    display flex;
    font-size 50px;
    margin-top 50px;
  `}

  ${mq.gtDesktop`
    font-size 60px;
    margin 100px 0 20px;
  `}
`;

const BrandNameContainer = styled.span`
  display: block;
  font-weight 700;
  color ${({ theme }) => theme.colors["primary-600"]};
  margin-right 15px;
  align-items flex-start;
`;

const Title = () => (
  <Container>
    <BrandNameContainer>
      <BrandName />
    </BrandNameContainer>
    <Text t={__("search.landing_page.kiwi_slogan")} />
  </Container>
);

export default Title;
