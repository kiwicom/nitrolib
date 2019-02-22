// @flow strict
import * as React from "react";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import TileContent from "./components/TileContent";
import type { BaggageType, Gender, OrderStatusType } from "../../records/Baggage";
import type { PriceType } from "../../records/Price";

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

  const getTileItems = (baggageCategory, indices: Array<number>) => {
    const def = definitions[baggageCategory];
    return indices.map(optionIndex => ({
      category: def[optionIndex].category,
      restrictions: def[optionIndex].restrictions,
    }));
  };

  const handBags = getTileItems("handBag", currentHandBag.indices);
  const holdBags = getTileItems("holdBag", currentHoldBag.indices);

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
