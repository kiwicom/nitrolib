// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import R from "ramda";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";

import mq from "../../styles/mq";
import type { BaggageType } from "../../records/Baggage";
import BaggageItem from "./components/BaggageItem";
import Translate from "../Translate/index";

type Passenger = {
  id: number,
  firstName: string,
  lastName: string,
  baggage: {
    holdBag: number, // index of baggage combination
    handBag: number, // index of baggage combination
  },
};

const Wrapper = styled.div`
  width: 100%;
  > * {
    margin-bottom: 4px;
    ${mq.ltMiddleMobile(css`
      margin-bottom: 10px;
    `)};
  }
`;

type Props = {
  passengers: Array<Passenger>,
  baggage: BaggageType,
  currentPassengerId: ?number,
};

const BaggageOverview = ({ baggage, passengers, currentPassengerId }: Props) => {
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

  const getPassengersBaggage = (passengersArray, passengerId) => {
    if (passengerId) {
      return passengersArray.filter(id => id === passengerId);
    }
    return passengersArray;
  };

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
        passengers: getPassengersBaggage([...bagPassengers, bag.passengerId], currentPassengerId),
        restrictions: bag.restrictions,
      };
      return acc;
    }, {});

    return Object.keys(data).map(key => data[key]);
  };
  const handBags = getBaggageRowData("handBag");
  const holdBags = getBaggageRowData("holdBag");

  return (
    <Wrapper spacing="tight">
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
          isPassengersShowed={!currentPassengerId}
        />
      ))}
      {holdBags.map((bag, index) => (
        <BaggageItem
          key={index} // eslint-disable-line
          amount={bag.passengers.length}
          category={bag.category}
          passengers={getPassengersFromId(bag && bag.passengers)}
          restrictions={bag.restrictions}
          isPassengersShowed={!currentPassengerId}
        />
      ))}
    </Wrapper>
  );
};
export default BaggageOverview;
