// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import R from "ramda";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { groupDefinitions } from "../../services/baggage/utils";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import type {
  FAQLinksHandlerType,
  DefinitionWithPassenger,
  HoldBagDefinitionWithId,
  HandBagDefinitionWithId,
  OverviewContextType,
} from "../../records/Baggage";
import BaggageItem from "./components/BaggageItem";
import NoPersonalItem from "./components/NoPersonalItem";

type Props = {
  definitions?: (HandBagDefinitionWithId | HoldBagDefinitionWithId)[],
  definitionWithPassengers?: DefinitionWithPassenger[],
  FAQLinksHandler?: FAQLinksHandlerType,
  context: OverviewContextType,
};

type WrapperProps = {
  ...ThemeProps,
  context: OverviewContextType,
};

const Wrapper = styled.div`
  width: 100%;
  > * {
    margin-bottom: 10px;
    ${mq.mediumMobile(css`
      margin-bottom: ${({ theme, context }: WrapperProps) =>
        context === "MMB-PassengersSummary" ? theme.orbit.spaceXSmall : theme.orbit.spaceXXSmall};
    `)};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
  context: "booking",
};

const BaggageOverview = ({
  definitions,
  definitionWithPassengers,
  context,
  FAQLinksHandler,
}: Props) => {
  const baggages = definitionWithPassengers || (definitions && groupDefinitions(definitions));

  return (
    <Wrapper context={context} data-test={`BaggageOverview-${context}`}>
      {baggages && !baggages.some(R.propEq("category", "personalItem")) && <NoPersonalItem />}
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
