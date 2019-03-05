// @flow strict
import * as React from "react";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import TileContent from "./components/TileContent";
import { getTotalPrice } from "../../services/baggage/utils";
import type {
  BaggageType,
  Gender,
  HandBagDefinition,
  HoldBagDefinition,
} from "../../records/Baggage";

type Props = {
  firstName: string,
  middleName?: string, // what to show? initial or whole middleName?
  lastName: string,
  gender: Gender,
  dayOfBirth?: string, // format it with date fns
  isProcessing: boolean,
  current?: {
    handBag: number,
    holdBag: number,
  },
  selected?: {
    handBag: number,
    holdBag: number,
  },
  definitions?: Array<HandBagDefinition | HoldBagDefinition>,
  onClick?: () => void,
  baggage: BaggageType,
};

const CustomerBaggageTile = ({
  firstName,
  middleName,
  lastName,
  gender,
  dayOfBirth,
  isProcessing,
  current,
  selected,
  definitions: newDefinitions,
  onClick,
  baggage,
}: Props) => {
  const { definitions, combinations } = baggage;

  const getDefinitions = (): Array<HandBagDefinition | HoldBagDefinition> => {
    if (newDefinitions) {
      return newDefinitions;
    }
    if (selected && current) {
      const selectedHandBag = combinations.handBag[selected.handBag].indices.map(
        index => definitions.handBag[index],
      );
      const selectedHoldBag = combinations.holdBag[selected.holdBag].indices.map(
        index => definitions.holdBag[index],
      );
      return [...selectedHandBag, ...selectedHoldBag];
    }
    return [];
  };

  const calculatePrice = (): number | null => {
    if (selected && current) {
      return (
        getTotalPrice({
          combinationIndices: { handBag: [selected.handBag], holdBag: [selected.holdBag] },
          combinations,
        }) -
        getTotalPrice({
          combinationIndices: { handBag: [current.handBag], holdBag: [current.holdBag] },
          combinations,
        })
      );
    }
    return null;
  };

  const getStatus = () => {
    if (isProcessing) {
      return "processing";
    }
    if (current && selected) {
      return "unpaid";
    }
    return "notAvailable";
  };

  return (
    <Tile
      onClick={onClick && onClick}
      title={
        <Title
          gender={gender}
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          orderStatus={getStatus()}
          price={calculatePrice()}
          dayOfBirth={dayOfBirth}
        />
      }
      description={<TileContent definitions={getDefinitions()} orderStatus={getStatus()} />}
    />
  );
};

export default CustomerBaggageTile;
