// @flow strict
import * as R from "ramda";

type Validator = (value: string) => string;

// eslint-disable-next-line fp/no-rest-parameters
const compose = (...validators: Validator[]): Validator => (value: string) =>
  R.compose(R.reduce((acc, next) => acc || next(value), ""), R.reverse)(validators);

export default compose;
