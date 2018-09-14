// @flow strict
import makeEnvironment from "./utils/makeEnvironment";
import type { Input } from "./utils/makeEnvironment";

const call = (input: Input) =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      // Add authentication and other headers here
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: input.variables.token, // FIXME document this
    },
    body: JSON.stringify(input),
  }).then(res => res.json());

export default makeEnvironment(call);
