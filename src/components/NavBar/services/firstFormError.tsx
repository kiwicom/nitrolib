import * as R from "ramda";

const firstFormError: ({ [key: string]: any }) => ?string = R.compose(
  R.head,
  R.filter(Boolean),
  R.map(R.prop("error")),
  R.values,
);

export default firstFormError;
