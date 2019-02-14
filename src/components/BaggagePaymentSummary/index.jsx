// @flow
import * as React from "react";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import PassengerBaggages from "./components/PassengerBaggages";
import TotalPayment from "./components/TotalPayment";
import type { BaggageType, HoldBagDefinition, HandBagDefinition } from "../../records/Baggage";
import { getTotalPrice } from "../../services/baggage/utils";

type Passenger = {
  id: number,
  firstName: string,
  lastName: string,
  baggage: {
    holdBag: number, // index of baggage combination
    handBag: number, // index of baggage combination
  },
};

type Props = {
  passengers: Array<Passenger>,
  baggage: BaggageType,
};

const BaggagePaymentSummary = ({ baggage, passengers }: Props) => {
  const { combinations, definitions } = baggage;

  const getDefinitions = (
    def: Array<HoldBagDefinition> | Array<HandBagDefinition>,
    indices: Array<number>,
  ) => {
    const data = indices.reduce((acc, optionIndex) => {
      const key = optionIndex.toString();
      if (acc[key]) {
        acc[key].amount += 1;
      } else {
        acc[key] = {
          amount: 1,
          category: def[optionIndex].category,
          restrictions: def[optionIndex].restrictions,
          conditions: def[optionIndex].conditions,
        };
      }
      return acc;
    }, {});
    return Object.keys(data).map(key => data[key]);
  };

  const passengersWithBagDefinitions = passengers.map(passenger => ({
    id: passenger.id,
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    baggage: {
      handBag: getDefinitions(
        definitions.handBag,
        combinations.handBag[passenger.baggage.handBag].indices,
      ),
      holdBag: getDefinitions(
        definitions.holdBag,
        combinations.holdBag[passenger.baggage.holdBag].indices,
      ),
    },
    price:
      combinations.handBag[passenger.baggage.handBag].price.amount +
      combinations.holdBag[passenger.baggage.holdBag].price.amount,
  }));

  const passengersCombinationsIndices = passengers.reduce(
    (acc, passenger) => {
      acc.handBag = acc.handBag.concat(passenger.baggage.handBag);
      acc.holdBag = acc.holdBag.concat(passenger.baggage.holdBag);
      return acc;
    },
    { holdBag: [], handBag: [] },
  );
  return (
    <Card>
      <CardSection>
        {passengersWithBagDefinitions.map(passenger => (
          <PassengerBaggages key={passenger.id} {...passenger} />
        ))}
        <Separator spaceAfter="large" />
        <TotalPayment
          totalPrice={getTotalPrice({
            combinationIndices: passengersCombinationsIndices,
            combinations,
          })}
        />
      </CardSection>
    </Card>
  );
};
export default BaggagePaymentSummary;
