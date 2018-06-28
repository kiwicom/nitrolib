// @flow strict
import makeEnvironment from "../../services/utils/makeEnvironment";
import type { Input } from "../../services/utils/makeEnvironment";

const call = (input: Input) =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      // Add authentication and other headers here
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  }).then(res => res.json());

export default makeEnvironment(call);
