// @flow strict
import * as React from "react";
import styled from "styled-components";
import R from "ramda";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import Content from "./components/Content";
import { getTotalPrice } from "../../services/baggage/utils";
import type {
  BaggageType,
  Gender,
  HoldBagTileDefinition,
  BaggageCategory,
  HandBagTileDefinition,
} from "../../records/Baggage";

const Wrapper = styled.div`
  div:last-child > svg {
    display: ${({ isIconShown }: { isIconShown: boolean }) => (isIconShown ? "inline" : "none")};
  }
`;

type Props = {
  firstName: string,
  middleName?: string,
  lastName: string,
  gender: Gender,
  dayOfBirth?: string,
  isProcessing: boolean,
  current?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  selected?: {
    handBag: number, // index of combination
    holdBag: number, // index of combination
  },
  definitions?: (HoldBagTileDefinition | HandBagTileDefinition)[],
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

  const handleIsCurrentFlag = (defs, commonDefIndices) => {
    const memo = [...commonDefIndices];
    return defs.reduce((acc, def) => {
      if (memo.some(i => i === def.originalIndex)) {
        def.isCurrent = true; // eslint-disable-line
        memo.splice(memo.findIndex(i => i === def.originalIndex), 1); // eslint-disable-line
      }
      // $FlowExpected: Union types issue
      return acc.concat(def);
    }, []);
  };

  const filterNewDefinitions = (bagType: BaggageCategory) => {
    if (newDefinitions) {
      return newDefinitions.filter(def => {
        if (bagType === "handBag") {
          return def.category === "cabinBag" || def.category === "personalItem";
        }
        return def.category === "holdBag";
      });
    }
    return [];
  };

  const getDefinitions = (
    bagType: BaggageCategory,
  ): (HoldBagTileDefinition | HandBagTileDefinition)[] => {
    const currentCombination = current && current[bagType];
    const selectedCombination = selected && selected[bagType];
    if (typeof selectedCombination === "number" && typeof currentCombination === "number") {
      const currentIndices = combinations[bagType][currentCombination].indices;
      const selectedIndices = combinations[bagType][selectedCombination].indices;
      const newDefinitionsIndices = R.intersection(selectedIndices, currentIndices);
      const selectedDef = selectedIndices.map(index => ({
        originalIndex: index,
        isCurrent: false,
        ...definitions[bagType][index],
      }));

      return handleIsCurrentFlag(selectedDef, newDefinitionsIndices);
    }
    return filterNewDefinitions(bagType) || [];
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
    if (current && selected && R.equals(current, selected)) {
      return null;
    }
    if (isProcessing) {
      return "processing";
    }
    if (current && selected) {
      return "unpaid";
    }
    return "notAvailable";
  };

  const handBag = getDefinitions("handBag");
  const holdBag = getDefinitions("holdBag");
  return (
    <Wrapper isIconShown={!!onClick}>
      <Tile
        dataTest="CustomerBaggageTile"
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
        description={<Content definitions={[...handBag, ...holdBag]} orderStatus={getStatus()} />}
      />
    </Wrapper>
  );
};

export default CustomerBaggageTile;
