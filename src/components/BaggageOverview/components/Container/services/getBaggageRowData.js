// @flow strict
import * as R from "ramda";

import getPassengersFromId from "./getPassengersFromId";
import type {
  BaggageCategory,
  Passenger,
  BaggageType,
  DefinitionWithPassenger,
} from "../../../../../records/Baggage";

type getBaggageRowDataArgs = {
  bagType: BaggageCategory,
  passengers: Passenger[],
  baggage: BaggageType,
};

export default function getBaggageRowData({
  bagType,
  baggage,
  passengers,
}: getBaggageRowDataArgs): DefinitionWithPassenger[] {
  const { combinations } = baggage;
  const definitions = baggage.definitions[bagType];

  const passengersWithBagDefinitionsIndices = passengers.map(passenger => ({
    paxId: passenger.paxId,
    definitionsIndices: {
      handBag: combinations.handBag[passenger.baggage.handBag].indices,
      holdBag: combinations.holdBag[passenger.baggage.holdBag].indices,
    },
  }));

  const baggageData = passengersWithBagDefinitionsIndices.reduce(
    (acc, passenger) =>
      acc.concat(
        ...passenger.definitionsIndices[bagType].map(bagIndex => ({
          paxId: passenger.paxId,
          originalIndex: bagIndex,
          category: definitions[bagIndex].category,
          restrictions: definitions[bagIndex].restrictions,
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
}
