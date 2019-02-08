// @flow

import * as React from "react";
import styled from "styled-components";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import Hotel from "./Hotel";
// import TravelArrangement from "../TravelArrangement";
// import TravelDates from "../TravelDates";
import PriceBreakdown from "./PriceBreakdown";

type Props = {|
  data: ContentType,
  checkout?: boolean,
|};

const TravelDatesWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceLarge};
`;

const TravelArrangement = () => null;
const TravelDates = () => null;

const Content = ({ data, checkout }: Props) => (
  <>
    <Hotel data={data.hotelInfo} checkout={checkout} />
    <Separator />
    <TravelArrangement />
    <Separator />
    <TravelDatesWrapper>
      <TravelDates />
    </TravelDatesWrapper>
    <Separator />
    <PriceBreakdown />
  </>
);

export default Content;
