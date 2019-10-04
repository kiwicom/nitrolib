// @flow strict

import { createEnvironment, createNetworkFetcher } from "@kiwicom/relay";

type Headers = { [key: string]: string };

const makeEnvironment = (headers?: Headers, query?: string = "https://graphql.kiwi.com") =>
  createEnvironment({
    fetchFn: createNetworkFetcher(query, {
      ...headers,
      "Content-type": "application/json",
      Accept: "application/json",
      "X-Client": (headers && headers["X-Client"]) || "nitro",
    }),
  });

export default makeEnvironment;
