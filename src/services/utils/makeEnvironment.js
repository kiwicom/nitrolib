// @flow strict
import { Environment, Network, RecordSource, Store } from "relay-runtime";

export type Input = {
  query: string,
  variables: { [key: string]: string },
};

export type Call = (input: Input) => Promise<any>;

const makeFetchQuery = (call: Call) => (operation, variables) =>
  call({
    query: operation.text,
    variables,
  });

const store = new Store(new RecordSource());

const makeEnvironment = (call: Call) =>
  new Environment({
    network: Network.create(makeFetchQuery(call)),
    store,
  });

export default makeEnvironment;
