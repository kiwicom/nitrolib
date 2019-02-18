// @flow strict
import * as React from "react";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import TileContent from "./components/TileContent";
import type { BaggageType, Gender, PriceType, OrderStatusType } from "../../records/Baggage";

type Props = {
  firstName: string,
  lastName: string,
  gender: Gender,
  currentBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  onClick: () => void,
  orderStatus: OrderStatusType,
  price?: PriceType,
};

const CustomerBaggageTile = ({
  firstName,
  lastName,
  onClick,
  gender,
  orderStatus,
  baggage,
  currentBaggage,
  price,
}: Props) => {
  const { definitions, combinations } = baggage;

  const currentHandBag = combinations.handBag[currentBaggage.handBag];
  const currentHoldBag = combinations.holdBag[currentBaggage.holdBag];

  const getGroupedBaggages = (baggageCategory, indices: Array<number>) => {
    const def = definitions[baggageCategory];
    return indices.reduce((acc, optionIndex) => {
      const key = optionIndex.toString();
      if (acc[key]) {
        acc[key].amount += 1;
      } else {
        acc[key] = {
          amount: 1,
          category: def[optionIndex].category,
          restrictions: def[optionIndex].restrictions,
        };
      }
      return acc;
    }, {});
  };

  const handBags = getGroupedBaggages("handBag", currentHandBag.indices);
  const holdBags = getGroupedBaggages("holdBag", currentHoldBag.indices);

  return (
    <Tile
      onClick={onClick}
      title={
        <Title
          gender={gender}
          firstName={firstName}
          lastName={lastName}
          orderStatus={orderStatus}
          price={price}
        />
      }
      description={
        <TileContent handBags={handBags} holdBags={holdBags} orderStatus={orderStatus} />
      }
    />
  );
};

export default CustomerBaggageTile;
