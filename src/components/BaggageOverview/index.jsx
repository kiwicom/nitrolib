// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import R from "ramda";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import type {
  FAQLinksHandlerType,
  DefinitionWithPassenger,
  HoldBagDefinitionWithId,
  HandBagDefinitionWithId,
} from "../../records/Baggage";
import BaggageItem from "./components/BaggageItem";
import Translate from "../Translate/index";

type Props = {
  definitions?: Array<HandBagDefinitionWithId | HoldBagDefinitionWithId>,
  definitionWithPassengers?: Array<DefinitionWithPassenger>,
  FAQLinksHandler?: FAQLinksHandlerType,
  context: "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking",
};

const Wrapper = styled.div`
  width: 100%;
  > * {
    margin-bottom: 10px;
    ${mq.mediumMobile(css`
      margin-bottom: 4px;
    `)};
  }
`;

const NoPersonalItem = () => (
  <Stack shrink spacing="condensed" align="center">
    <BaggagePersonalItemNone size="medium" color="primary" />
    <Text>
      <Translate t="baggage_modal.select.no_personal_item" />
    </Text>
  </Stack>
);

const BaggageOverview = ({
  definitions,
  definitionWithPassengers,
  context,
  FAQLinksHandler,
}: Props) => {
  const getDefinitions = () => {
    if (definitionWithPassengers) {
      return definitionWithPassengers;
    }
    if (definitions) {
      const groupedDefinitions = definitions.reduce((acc, def) => {
        if (acc[def.id]) {
          acc[def.id].amount += 1;
        } else {
          acc[def.id] = {
            amount: 1,
            ...def,
          };
        }
        return acc;
      }, {});
      return R.values(groupedDefinitions);
    }
    return null;
  };
  const baggages = getDefinitions();
  return (
    <Wrapper spacing="tight">
      <Text>Baggage</Text>
      {baggages && baggages.some(bag => bag.category === "personalItem") && <NoPersonalItem />}
      {baggages &&
        baggages.map((bag, index) => (
          <BaggageItem
            key={index} // eslint-disable-line
            amount={bag.passengers ? bag.passengers.length : bag.amount}
            passengers={bag.passengers}
            category={bag.category}
            restrictions={bag.restrictions}
            FAQLinksHandler={FAQLinksHandler}
            context={context}
          />
        ))}
    </Wrapper>
  );
};

export default BaggageOverview;
