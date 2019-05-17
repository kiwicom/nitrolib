// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";

import Itinerary from "../src/components/Itinerary/index";
import ItineraryOneWay from "../src/records/__mocks__/Itinerary/ItineraryOneWay";
import ItineraryReturn from "../src/records/__mocks__/Itinerary/ItineraryReturn";
import ItineraryMulticity from "../src/records/__mocks__/Itinerary/ItineraryMulticity";
import { flatten } from "../src/records/Itinerary";

storiesOf("Itinerary", module)
  .addDecorator(withKnobs)
  .add("oneWay", () => <Itinerary itinerary={flatten(ItineraryOneWay)} />)
  .add("return", () => <Itinerary itinerary={flatten(ItineraryReturn)} />)
  .add("multicity", () => <Itinerary itinerary={flatten(ItineraryMulticity)} />);
