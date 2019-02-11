// @flow

import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Calendar from "@kiwicom/orbit-components/lib/icons/Calendar";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import Translate from "../Translate";
import type { TravelDates as TravelDatesType } from "../../records/TravelDates";

type Props = {|
  data: TravelDatesType,
|};

const TravelDates = ({ data }: Props) => {
  const { from, to } = data;
  return (
    <>
      <Heading element="h4" type="title3" spaceAfter="medium">
        <Translate t="holidays.detail.travel_dates" />
      </Heading>
      <Stack direction="row" spacing="compact">
        <Calendar color="primary" />
        <Text>
          {/* TODO Finalise based on data from API */}
          <Translate t="holidays.from_x_till_x_" values={{ from, to }} html />
          <br />
          <Translate t="holidays.x_nights_in_restort" values={{ num: 11 }} />
        </Text>
      </Stack>
    </>
  );
};

export default TravelDates;
