// @flow strict
import * as R from "ramda";

export type Validator = (value: any) => string;

// eslint-disable-next-line fp/no-rest-parameters
const compose = (...validators: Validator[]): Validator => (value: any) =>
  R.compose(
    R.reduce((acc, next) => acc || next(value), ""),
    R.reverse,
  )(validators);

export default compose;
