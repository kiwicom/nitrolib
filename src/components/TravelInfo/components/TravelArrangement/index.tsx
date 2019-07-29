
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import Translate from "../../../Translate";
import Sector from "./components/Sector";
import { TravelArrangement as TravelArrangementType } from "../../records/TravelArrangement";

type Props = {
  data: TravelArrangementType,
};

const TravelArrangement = ({ data }: Props) => {
  const { takeOff, landing } = data;

  return (
    <Stack spaceAfter="large">
      <Heading element="h4" type="title3" spaceAfter="small">
        <Translate t="holidays.detail.travel_arrangement" />
      </Heading>
      <Stack flex direction="column" spacing="comfy" largeMobile={{ direction: "row" }}>
        <Sector data={takeOff} direction="takeOff" />
        <Sector data={landing} direction="landing" />
      </Stack>
    </Stack>
  );
};

export default TravelArrangement;
