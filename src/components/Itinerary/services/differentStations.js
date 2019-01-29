// @flow strict
import type { Segments } from "../../../records/Segment";

const differentStations = (segments: Segments) => {
  const segmentsArr = Object.keys(segments).map(key => segments[key]);
  return segmentsArr
    .map((segment, i) => {
      if (i > 0 && segment.layover.isStationChange) {
        return segment.id;
      }
      return null;
    })
    .filter(Boolean);
};

export default differentStations;
