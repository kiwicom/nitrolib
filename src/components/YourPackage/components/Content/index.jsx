// @flow strict

import * as React from "react";
import styled from "styled-components";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import TravelArrangement from "./components/TravelArrangement";
import { type TravelArrangement as TravelArrangementType } from "../../records/TravelArrangement";
import TravelDates from "../../../TravelInfo/components/TravelDates";
import { type TravelDates as TravelDatesType } from "../../../TravelInfo/records/TravelDates";
import Hotel from "./components/HotelInfo";
import { type Hotel as HotelType } from "../../records/Hotel";
import PriceBreakdown from "./components/PriceBreakdown";
import { type PriceBreakdown as PriceBreakdownType } from "../../records/PriceBreakdown";
import { themeDefault } from "../../../../records/Theme";

type Props = {|
  hotel: HotelType,
  travelDates: TravelDatesType,
  travelArrangement: TravelArrangementType,
  priceBreakdown: PriceBreakdownType,
  search?: boolean,
  isCalculatingPrice?: boolean,
|};

const TravelDatesWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceLarge};
`;

TravelDatesWrapper.defaultProps = {
  theme: themeDefault,
};

const Content = ({
  isCalculatingPrice,
  priceBreakdown,
  hotel,
  travelArrangement,
  travelDates,
  search,
}: Props) => (
  <>
    <Hotel hotel={hotel} search={search} />
    <Separator spaceAfter="large" />
    <TravelArrangement data={travelArrangement} />
    <Separator spaceAfter="large" />
    <TravelDatesWrapper>
      <TravelDates data={travelDates} />
    </TravelDatesWrapper>
    <Separator spaceAfter="large" />
    <PriceBreakdown isCalculatingPrice={isCalculatingPrice} priceBreakdown={priceBreakdown} />
  </>
);

export default Content;
