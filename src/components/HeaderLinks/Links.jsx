// @flow strict
import React from "react";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import CarRental from "@kiwicom/orbit-components/lib/icons/CarRental";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";

import Text from "../Text";
import Link from "./Link";

type Props = {|
  linkFlights: string,
  linkRooms: string,
  linkCars: string,
  linkHolidays: string,
|};

const Links = ({ linkFlights, linkRooms, linkCars, linkHolidays }: Props) => (
  <>
    <Link
      logTab="flights"
      link={linkFlights}
      icon={<Airplane />}
      text={<Text t={__("search.service.travel_anywhere")} />}
    />
    <Link
      logTab="rooms"
      link={linkRooms}
      newWindow
      icon={<Accommodation />}
      text={<Text t={__("search.service.rooms")} />}
    />
    <Link
      logTab="cars"
      link={linkCars}
      newWindow
      icon={<CarRental />}
      text={<Text t={__("search.service.cars")} />}
    />
    {linkHolidays !== "" && (
      <Link
        link={linkHolidays}
        newWindow
        icon={<Suitcase />}
        text={<Text t={__("search.service.holidays")} />}
      />
    )}
  </>
);

export default Links;
