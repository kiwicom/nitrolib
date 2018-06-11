// @flow strict
import * as R from "ramda";

const isEmptish = R.compose(R.isEmpty, R.filter(Boolean));

export default isEmptish;
