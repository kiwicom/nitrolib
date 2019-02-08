// @flow

import * as React from "react";
import styled, { css } from "styled-components";
// import Observer from "react-intersection-observer";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Translate from "@kiwicom/nitro/lib/components/Translate";

import Share from "./Share";
import Content from "./Content";
import media from "../media";
import type { detailQueryResponse } from "../../pages/__generated__/detailQuery.graphql";

type Props = {|
  data: detailQueryResponse,
  share: {
    url: string,
    quote: string,
  },
  checkout?: boolean,
  // onInView: (inView: boolean) => void,
|};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  margin-top: 66px;
  margin-bottom: ${({ theme }) => theme.orbit.spaceXXLarge};
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Do not collapse when button is missing */
  min-height: ${({ theme }) => theme.orbit.heightButtonNormal};
  margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
`;

const ContentWrapper = styled.div`
  ${({ theme: { orbit } }) => css`
    margin-bottom: ${orbit.spaceLarge};
    background: ${orbit.paletteWhite};

    ${media.md.max`
      margin: 0 -${orbit.spaceMedium};
      padding: ${orbit.spaceLarge} ${orbit.spaceMedium};
    `};

    ${media.md.min`
      padding: ${orbit.spaceLarge};
      border-radius: ${orbit.borderRadiusNormal};
      border-width: ${orbit.borderWidthCard};
      border-style: ${orbit.borderStyleCard};
      border-color: ${orbit.borderColorCard};
      box-shadow: ${orbit.boxShadowElevatedLevel1};
    `};
  `};
`;

// const YourPackage = ({ data, checkout, onInView, share }: Props) => (
// const YourPackage = ({ data, checkout, share }: Props) => (
//  <Wrapper>
//    <HeadingWrapper>
//      <Heading element="h3" type="title2">
//        <Translate t="holidays.detail.your_package" />
//      </Heading>
//      {!checkout && <Share url={share.url} quote={share.quote} />}
//    </HeadingWrapper>
//    <ContentWrapper>
//      <Content data={data.getDetail} checkout={checkout} />
//    </ContentWrapper>
//  </Wrapper>
// );
const YourPackage = ({ data, checkout, share }: Props) => (
  <Wrapper>
    <HeadingWrapper>
      <Heading element="h3" type="title2">
        <Translate t="holidays.detail.your_package" />
      </Heading>
      {!checkout && <Share url={share.url} quote={share.quote} />}
    </HeadingWrapper>
    <ContentWrapper>
      <Content data={data.getDetail} checkout={checkout} />
    </ContentWrapper>
  </Wrapper>
);

export default YourPackage;
