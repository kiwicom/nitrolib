// @flow strict
import * as React from "react";

import type { BaggageType, Passenger, DefinitionWithPassenger } from "../../../../records/Baggage";
import getBaggageRowData from "./services/getBaggageRowData";

type Arg = {|
  context: "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking",
  definitionsWithPassengers: DefinitionWithPassenger[],
|};

type Props = {|
  passengers: Passenger[],
  baggage: BaggageType,
  context: "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking",
  children: (arg: Arg) => React.Node,
|};

const BaggageOverviewContainer = ({ baggage, children, context, passengers }: Props) => {
  const definitionsWithPassengers = [
    ...getBaggageRowData({
      bagType: "handBag",
      baggage,
      passengers,
    }),
    ...getBaggageRowData({
      bagType: "holdBag",
      baggage,
      passengers,
    }),
  ];

  return children({
    definitionsWithPassengers,
    context,
  });
};

export default BaggageOverviewContainer;
