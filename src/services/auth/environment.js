// @flow strict
import makeEnvironment from "../utils/makeEnvironment";

const call = input =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: window.AUTH_TOKEN || "", // TODO document this
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  }).then(response => response.json());

export default makeEnvironment(call);
