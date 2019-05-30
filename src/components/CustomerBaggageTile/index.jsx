// @flow strict
import * as React from "react";
import styled from "styled-components";
import Tile from "@kiwicom/orbit-components/lib/Tile";

import Title from "./components/Title";
import Content from "./components/Content";
import getDefinitions from "./services/getDefinitions";
import calculatePrice from "./services/calculatePrice";
import getStatus from "./services/getStatus";
import type { BaggageType, Definition } from "../../records/Baggage";

const Wrapper = styled.div`
  div:last-child > svg {
    display: ${({ isIconShowed }: { isIconShowed: boolean }) => (isIconShowed ? "inline" : "none")};
  }
  div {
    cursor: ${({ isIconShowed }: { isIconShowed: boolean }) =>
      isIconShowed ? "cursor" : "default"};
  }
`;

type Props = {|
  firstName: string,
  middleName?: string,
  lastName: string,
  icon: React.Node,
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
  newDefinitions?: Definition[],
  onClick?: () => void,
  supportLinkHandler?: () => void,
  baggage: BaggageType,
|};

const CustomerBaggageTile = ({
  firstName,
  middleName,
  lastName,
  icon,
  dayOfBirth,
  isProcessing,
  current,
  selected,
  newDefinitions,
  onClick,
  supportLinkHandler,
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
  const isClickEnabled = status === "unpaid" || status === null;
  const handleOnClick = isClickEnabled && !!onClick ? onClick : () => {};

  return (
    <Wrapper isIconShowed={isClickEnabled}>
      <Tile
        dataTest={`CustomerBaggageTile-${status || "none"}`}
        onClick={handleOnClick}
        title={
          <Title
            icon={icon}
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            orderStatus={status}
            price={calculatePrice({ selected, current, combinations })}
            dayOfBirth={dayOfBirth}
          />
        }
        description={
          <Content
            definitions={[...handBag, ...holdBag]}
            orderStatus={status}
            supportLinkHandler={supportLinkHandler}
          />
        }
      />
    </Wrapper>
  );
};

export default CustomerBaggageTile;
