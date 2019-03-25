// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import type { ItineraryDeep } from "../../../../records/Itinerary";
import StarredSegment from "./Segment";

type Props = {|
  itinerary: ItineraryDeep,
|};

const ItineraryVariants = ({ itinerary }: Props) => {
  return (
    <Stack direction="column" flex shrink>
      {itinerary.type === "oneWay" && (
        <StarredSegment
          source={itinerary.sector.segments[0].source}
          destination={itinerary.sector.segments[0].destination}
        />
      )}
      {itinerary.type === "return" && (
        <>
          <StarredSegment
            source={itinerary.outbound.segments[0].source}
            destination={
              itinerary.outbound.segments[itinerary.outbound.segments.length - 1].destination
            }
          />
          <StarredSegment
            source={itinerary.inbound.segments[0].source}
            destination={
              itinerary.inbound.segments[itinerary.inbound.segments.length - 1].destination
            }
          />
        </>
      )}
      {(itinerary.type === "multicity" || itinerary.type === "nomad") &&
        itinerary.sectors.map(sector => (
          <StarredSegment
            key={sector.id}
            source={sector.segments[0].source}
            destination={sector.segments[sector.segments.length - 1].destination}
          />
        ))}
    </Stack>
  );
};

export default ItineraryVariants;
