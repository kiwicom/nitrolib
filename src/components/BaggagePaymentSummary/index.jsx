// @flow strict
import * as React from "react";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import PassengerBaggages from "./components/PassengerBaggages";
import TotalPayment from "./components/TotalPayment";
import type {
  BaggageType,
  HoldBagDefinition,
  HandBagDefinition,
  ItemType,
} from "../../records/Baggage";
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
  passengers: Passenger[],
  baggage: BaggageType,
};

const BaggagePaymentSummary = ({ baggage, passengers }: Props) => {
  const { combinations, definitions } = baggage;

  const getDefinitions = (
    def: HoldBagDefinition[] | HandBagDefinition[],
    indices: number[],
  ): ItemType[] => {
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

  const passengersCombinationsIndices = {
    handBag: passengers.map(passenger => passenger.baggage.handBag),
    holdBag: passengers.map(passenger => passenger.baggage.holdBag),
  };

  return (
    <Card dataTest="BaggagePaymentSummary">
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
