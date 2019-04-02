// @flow
import * as React from "react";
import R from "ramda";

import type {
  BaggageType,
  BaggagePassengerType,
  Passenger,
  DefinitionWithPassenger,
} from "../../../../records/Baggage.js.flow";

type ChildrenProps = {
  context: "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking",
  definitionWithPassengers: Array<DefinitionWithPassenger>,
};

type Props = {
  passengers: Array<Passenger>,
  baggage: BaggageType,
  context: "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking",
  children: ChildrenProps => React.Node,
};

const BaggageOverviewContainer = ({ baggage, children, context, passengers }: Props) => {
  const { combinations } = baggage;

  const passengersWithBagDefinitionsIndices = passengers.map(passenger => ({
    paxId: passenger.paxId,
    definitionsIndices: {
      handBag: combinations.handBag[passenger.baggage.handBag].indices,
      holdBag: combinations.holdBag[passenger.baggage.holdBag].indices,
    },
  }));

  const getPassengersFromId = (
    paxIds: Array<number>,
    passengersArray,
  ): Array<BaggagePassengerType> =>
    R.innerJoin((passenger, paxId) => passenger.paxId === paxId, passengersArray, paxIds).map(
      p => ({
        paxId: p.paxId,
        firstName: p.firstName,
        middleName: p.middleName,
        lastName: p.lastName,
      }),
    );

  const getBaggageRowData = bagType => {
    const defs = baggage.definitions[bagType];
    const baggageData = passengersWithBagDefinitionsIndices.reduce(
      (acc, passenger) =>
        acc.concat(
          ...passenger.definitionsIndices[bagType].map(bagIndex => ({
            paxId: passenger.paxId,
            originalIndex: bagIndex,
            category: defs[bagIndex].category,
            restrictions: defs[bagIndex].restrictions,
          })),
        ),
      [],
    );
    const baggageWithPassengersIds = baggageData.reduce((acc, bag) => {
      const bagPassengers = acc[bag.originalIndex]?.passengers || [];
      acc[bag.originalIndex] = {
        originalIndex: bag.originalIndex,
        category: bag.category,
        passengers: [...bagPassengers, bag.paxId],
        restrictions: bag.restrictions,
      };
      return acc;
    }, {});

    return R.values(baggageWithPassengersIds).map(bag => ({
      ...bag,
      passengers: getPassengersFromId(bag.passengers, passengers),
    }));
  };

  const definitionWithPassengers = [
    ...getBaggageRowData("handBag"),
    ...getBaggageRowData("holdBag"),
  ];
  return children({
    definitionWithPassengers,
    context,
  });
};

export default BaggageOverviewContainer;
