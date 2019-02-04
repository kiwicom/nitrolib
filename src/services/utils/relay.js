// @flow strict
import { Environment, GraphQLTaggedNode, Network, RecordSource, Store } from "relay-runtime";
import { commitMutation } from "react-relay";

export type Input = {
  query: string,
  variables: { [key: string]: string },
};

export type Call = (input: Input) => Promise<$FlowFixMe>;

const makeFetchQuery = (call: Call) => (operation, variables) =>
  call({
    query: operation.text,
    variables,
  });

const store = new Store(new RecordSource());

export const makeCall = (token: string, kwAuthToken: string = "") => (input: Input) =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
      "KW-Auth-Token": kwAuthToken,
      "X-Client": "nitro",
    },
    body: JSON.stringify(input),
  }).then(res => res.json());

export const makeEnvironment = (call: Call) =>
  new Environment({
    network: Network.create(makeFetchQuery(call)),
    store,
  });

export const executeMutation = <Variables, Result>(
  mutation: GraphQLTaggedNode,
  variables: Variables,
  environment: Environment = makeEnvironment(makeCall("")),
): Promise<Result> =>
  new Promise((resolve, reject) =>
    // $FlowExpected: Function with generics > default type that is too general
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (result: Result) => resolve(result),
      onError: reject,
    }),
  );
