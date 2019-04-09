// @flow strict
import * as React from "react";
import styled from "styled-components";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import Content from "./components/Content";
import { getDefinitions, calculatePrice, getStatus } from "./services/index";
import type {
  BaggageType,
  Gender,
  HoldBagTileDefinition,
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
  newDefinitions?: (HoldBagTileDefinition | HandBagTileDefinition)[],
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
  newDefinitions,
  onClick,
  baggage,
}: Props) => {
  const { combinations } = baggage;

  const handBag = getDefinitions({
    current,
    selected,
    baggage,
    newDefinitions,
    bagType: "handBag",
  });
  const holdBag = getDefinitions({
    current,
    selected,
    baggage,
    newDefinitions,
    bagType: "holdBag",
  });
  const status = getStatus({ current, selected, isProcessing });
  return (
    <Wrapper isIconShown={!!onClick}>
      <Tile
        dataTest={`CustomerBaggageTile-${status || "none"}`}
        onClick={onClick && onClick}
        title={
          <Title
            gender={gender}
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            orderStatus={status}
            price={calculatePrice({ selected, current, combinations })}
            dayOfBirth={dayOfBirth}
          />
        }
        description={<Content definitions={[...handBag, ...holdBag]} orderStatus={status} />}
      />
    </Wrapper>
  );
};

export default CustomerBaggageTile;
