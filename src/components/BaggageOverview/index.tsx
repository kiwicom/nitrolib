import * as React from "react";
import * as R from "ramda";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import groupDefinitions from "./services/groupDefinitions";
import {
  FAQLinksHandlerType,
  DefinitionWithPassenger,
  Definition,
  OverviewContextType,
} from "../../records/Baggage";
import BaggageItem from "./components/BaggageItem";
import NoPersonalItem from "./components/NoPersonalItem";

type Props = {
  definitions?: Definition[],
    definitionsWithPassengers ?: DefinitionWithPassenger[],
    FAQLinksHandler ?: FAQLinksHandlerType,
    context: OverviewContextType,
};

const BaggageOverview = ({
  definitions,
  definitionsWithPassengers,
  context,
  FAQLinksHandler,
}: Props) => {
  const baggages = definitionsWithPassengers || (definitions && groupDefinitions(definitions));

  return (
    <Stack
      flex
      direction="column"
      dataTest={`BaggageOverview-${context}`}
      mediumMobile={{
        spacing: context === "MMB-PassengersSummary" ? "condensed" : "tight",
        direction: "column",
      }}
    >
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
    </Stack>
  );
};

export default BaggageOverview;
