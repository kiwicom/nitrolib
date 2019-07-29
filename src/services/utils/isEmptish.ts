import * as R from "ramda";

const isEmptish: ({ [key: string]: any }) => boolean = R.compose(
  R.isEmpty,
  R.filter(Boolean),
);

export default isEmptish;
