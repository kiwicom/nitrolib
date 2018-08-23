// @flow strict
import React from "react";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import CarRental from "@kiwicom/orbit-components/lib/icons/CarRental";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";

import * as intlContext from "../../services/intl/context";
import * as currencyContext from "../../services/currency/context";
import Text from "../Text";
import Link from "./Link";
import { getCarsLanguage, getLink } from "./services/link";
import type { Provider } from "./services/link";

type Props = {|
  provider: Provider,
|};

const Links = ({ provider }: Props) => (
  <intlContext.Consumer>
    {intl => (
      <>
        <Link
          logTab="flights"
          link={`https://www.kiwi.com//${intl.language.id}/`}
          icon={<Airplane />}
          text={<Text t={__("search.service.travel_anywhere")} />}
        />
        <Link
          logTab="rooms"
          link={`http://rooms.kiwi.com/?lang=${intl.language.iso.substring(
            0,
            2,
          )}&label=headerlinks`}
          newWindow
          icon={<Accommodation />}
          text={<Text t={__("search.service.rooms")} />}
        />
        <Link
          logTab="cars"
          link={`//cars.kiwi.com/?preflang=${getCarsLanguage(intl.language.id)}&adplat=headerlinks`}
          newWindow
          icon={<CarRental />}
          text={<Text t={__("search.service.cars")} />}
        />
        <currencyContext.Consumer>
          {currencyObj => {
            const link = getLink(currencyObj.currency, intl.language, provider);

            return (
              link && (
                <Link
                  link={link}
                  newWindow
                  icon={<Suitcase />}
                  text={<Text t={__("search.service.holidays")} />}
                />
              )
            );
          }}
        </currencyContext.Consumer>
      </>
    )}
  </intlContext.Consumer>
);

export default Links;
