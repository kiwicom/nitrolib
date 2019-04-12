// @flow strict

import type { Restrictions } from "../../records/Baggage";

export default function getBaggageSize({ height, length, weight, width }: Restrictions): string {
  return `${length} x ${width} x ${height} cm, ${weight} kg`;
}
