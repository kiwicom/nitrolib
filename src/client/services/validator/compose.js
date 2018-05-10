// @flow strict
type Validator = (value: string) => string;

// eslint-disable-next-line fp/no-rest-parameters
const compose = (...validators: Validator[]): Validator => (value: string) =>
  validators.reduce((acc, next) => acc || next(value), "");

export default compose;
