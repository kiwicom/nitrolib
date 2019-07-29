
import { Restrictions } from "../../records/Baggage";

export default function getBaggageSize(
  { height, length, weight, width }: Restrictions,
  rlt: boolean,
): string {
  return rlt
    ? `${weight || 0}kg, ${length || 0} × ${width || 0} × ${height || 0}cm`
    : `${length || 0} × ${width || 0} × ${height || 0} cm, ${weight || 0} kg`;
}
