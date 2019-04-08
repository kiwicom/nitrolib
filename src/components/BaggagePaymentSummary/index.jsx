// @flow strict
import * as React from "react";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import PassengerBaggages from "./components/PassengerBaggages";
import TotalPayment from "./components/TotalPayment";
import type { BaggageType } from "../../records/Baggage";
import { getTotalPrice } from "../../services/baggage/utils";
import getDefinitions from "./services/getDefinitions";

type Passenger = {
  paxId: number,
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

  const passengersWithBagDefinitions = passengers.map(passenger => ({
    paxId: passenger.paxId,
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
          <PassengerBaggages key={passenger.paxId} {...passenger} />
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
