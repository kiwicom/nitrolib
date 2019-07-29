import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import ItinerarySector from "./components/Sector";
import { ItineraryNormalized } from "../../records/Itinerary";
import { getSector, getSectors } from "../../records/Sector";
import { getSegments } from "../../records/Segment";
import differentStations from "./services/differentStations";

type Props = {
  itinerary: ItineraryNormalized,
};

const ItineraryNew = ({ itinerary }: Props) => {
  // $FlowExpected: TODO
  const { type, outbound, inbound, sector } = itinerary.result;
  const carriers = Object.keys(itinerary.entities.carrier).map(
    key => itinerary.entities.carrier[key],
  );

  return (
    <>
      {type === "oneWay" && (
        <Stack flex direction="column">
          <ItinerarySector
            sector={getSector(itinerary, sector)}
            segments={getSegments(itinerary, getSector(itinerary, sector).segments)}
            stationChanged={differentStations(itinerary.entities.segment)}
            carriers={carriers}
            type={type}
          />
        </Stack>
      )}

      {type === "return" && (
        <Stack inline>
          <Stack flex shrink>
            <ItinerarySector
              sector={getSector(itinerary, outbound)}
              segments={getSegments(itinerary, getSector(itinerary, outbound).segments)}
              stationChanged={differentStations(itinerary.entities.segment)}
              carriers={carriers}
              type={type}
            />
          </Stack>
          <Stack flex shrink>
            <ItinerarySector
              sector={getSector(itinerary, inbound)}
              segments={getSegments(itinerary, getSector(itinerary, inbound).segments)}
              stationChanged={differentStations(itinerary.entities.segment)}
              returnTrip
              carriers={carriers}
              type={type}
            />
          </Stack>
        </Stack>
      )}

      {(type === "multicity" || type === "nomad") &&
        getSectors(itinerary).map((sec, i) => (
          <ItinerarySector
            key={sec.id}
            sector={sec}
            index={i}
            segments={getSegments(itinerary, sec.segments)}
            type={type}
            carriers={carriers}
            stationChanged={differentStations(itinerary.entities.segment)}
          />
        ))}
    </>
  );
};

export default ItineraryNew;
