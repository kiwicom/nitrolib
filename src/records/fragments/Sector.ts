import { schema } from "normalizr";

import { carrier, segment } from "./Segment";

// eslint-disable-next-line import/prefer-default-export
export const sector = new schema.Entity("sector", {
  segments: [segment],
  carriers: [carrier],
});
