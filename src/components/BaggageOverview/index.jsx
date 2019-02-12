// @flow
import * as React from "react";
import R from "ramda";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";

import type { BaggageType } from "../../records/Baggage";
import BaggageItem from "./components/BaggageItem";
import Translate from "../Translate/index";

type Passenger = {
  id: number,
  firstName: string,
  lastName: string,
  baggage: {
    holdBag: number, // indices of baggage combination
    handBag: number, // indices of baggage combination
  },
};

type Props = {
  passengers: Array<Passenger>,
  baggage: BaggageType,
};

const BaggageOverview = ({ baggage, passengers }: Props) => {
  const { combinations } = baggage;

  const getPassengersFromId = (
    ids: Array<number>,
  ): Array<{ lastName: string, firstName: string, id: number }> =>
    R.uniq(ids).map(id => {
      // $FlowFixMe
      const pass: Passenger = passengers.find(p => p.id === id);
      return {
        firstName: pass && pass.firstName,
        lastName: pass && pass.lastName,
        id,
      };
    });

  const passengersWithBagDefinitionsIndices = passengers.map(passenger => ({
    id: passenger.id,
    definitionsIndices: {
      handBag: combinations.handBag[passenger.baggage.handBag].indices,
      holdBag: combinations.holdBag[passenger.baggage.holdBag].indices,
    },
  }));

  const getBaggageRowData = bagType => {
    const definitions = baggage.definitions[bagType];
    const baggageData = passengersWithBagDefinitionsIndices.reduce(
      (acc, passenger) =>
        acc.concat(
          ...passenger.definitionsIndices[bagType].map(bagIndex => ({
            passengerId: passenger.id,
            originalIndex: bagIndex,
            category: definitions[bagIndex].category,
            restrictions: definitions[bagIndex].restrictions,
          })),
        ),
      [],
    );

    const data = baggageData.reduce((acc, bag) => {
      const bagPassengers = (acc[bag.originalIndex] && acc[bag.originalIndex].passengers) || [];
      acc[bag.originalIndex] = {
        originalIndex: bag.originalIndex,
        category: bag.category,
        passengers: [...bagPassengers, bag.passengerId],
        restrictions: bag.restrictions,
      };
      return acc;
    }, {});

    return Object.keys(data).map(key => data[key]);
  };
  const handBags = getBaggageRowData("handBag");
  const holdBags = getBaggageRowData("holdBag");

  return (
    <Stack spacing="tight">
      <Text>Baggage</Text>
      {!handBags.find(bag => bag.category === "personalItem") && (
        <Stack shrink spacing="condensed" align="center">
          <BaggagePersonalItemNone size="medium" color="primary" />
          <Text>
            <Translate t="common.baggage.no_personal_item" />
          </Text>
        </Stack>
      )}
      {handBags.map((bag, index) => (
        <BaggageItem
          key={index} // eslint-disable-line
          amount={bag.passengers.length}
          category={bag.category}
          passengers={getPassengersFromId(bag && bag.passengers)}
          restrictions={bag.restrictions}
        />
      ))}
      {holdBags.map((bag, index) => (
        <BaggageItem
          key={index} // eslint-disable-line
          amount={bag.passengers.length}
          category={bag.category}
          passengers={getPassengersFromId(bag && bag.passengers)}
          restrictions={bag.restrictions}
        />
      ))}
    </Stack>
  );
};
export default BaggageOverview;
