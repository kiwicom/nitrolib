// @flow strict

import type { Restrictions } from "../../records/Baggage";

export default function getBaggageSize({ height, length, weight, width }: Restrictions): string {
  return `${length || 0} x ${width || 0} x ${height || 0} cm, ${weight || 0} kg`;
}
