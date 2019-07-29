import { schema } from "normalizr";

export const carrier = new schema.Entity("carrier");

export const segment = new schema.Entity("segment", {
  carrier,
  operatingCarrier: carrier,
});
