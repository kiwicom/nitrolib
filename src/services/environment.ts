
import { createEnvironment, createNetworkFetcher } from "@kiwicom/relay";

const environment = createEnvironment({
  fetchFn: createNetworkFetcher("https://graphql.kiwi.com", {
    "Content-type": "application/json",
    Accept: "application/json",
    "X-Client": "nitro",
  }),
});

export default environment;
