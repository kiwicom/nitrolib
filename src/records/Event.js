// @flow strict
export type Event<E: string, D: Object> = {|
  event: E,
  data: D,
|};
