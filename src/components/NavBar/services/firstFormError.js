// @flow strict
import * as R from "ramda";

export default R.compose(
  R.head,
  R.filter(Boolean),
  R.map(R.prop("error")),
  R.values,
);
