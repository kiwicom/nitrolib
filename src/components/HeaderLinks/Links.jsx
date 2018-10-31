// @flow strict
import React from "react";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import CarRental from "@kiwicom/orbit-components/lib/icons/CarRental";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";

import Text from "../Text";
import Link from "./Link";

type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  inverted?: boolean,
  linkHolidays: string,
  forceNewWindow: boolean,
|};

const Links = ({
  linkFlights,
  linkRooms,
  linkCars,
  linkHolidays,
  forceNewWindow,
  inverted,
}: Props) => (
  <>
    <Link
      logTab="flights"
      link={linkFlights}
      inverted={inverted}
      newWindow={forceNewWindow}
      icon={<AirplaneUp />}
      text={<Text t={__("search.service.travel_anywhere")} />}
    />
    {linkRooms && (
      <Link
        logTab="rooms"
        link={linkRooms}
        inverted={inverted}
        newWindow
        icon={<Accommodation />}
        text={<Text t={__("search.service.rooms")} />}
      />
    )}
    <Link
      logTab="cars"
      link={linkCars}
      inverted={inverted}
      newWindow
      icon={<CarRental />}
      text={<Text t={__("search.service.cars")} />}
    />
    {linkHolidays && (
      <Link
        link={linkHolidays}
        newWindow
        inverted={inverted}
        icon={<Suitcase />}
        text={<Text t={__("search.service.holidays")} />}
      />
    )}
  </>
);

export default Links;
