// @flow strict

import { commitMutationAsync, graphql } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  createAccountMutationVariables,
  createAccountMutationResponse,
  createAccountInput,
  createAccountMutation,
} from "./__generated__/createAccountMutation.graphql";

const mutation = graphql`
  mutation createAccountMutation($brand: Brand!, $credentials: CreateAccountInput!) {
    createAccount(brand: $brand, credentials: $credentials) {
      success
      error
    }
  }
`;

const createAccount = (
  environment: Environment,
  brand: string,
  credentials: createAccountInput,
): Promise<createAccountMutationResponse> => {
  const variables: createAccountMutationVariables = {
    brand,
    credentials,
  };
  return commitMutationAsync<createAccountMutation>(environment, {
    mutation,
    variables,
  }).then(({ response }) => response);
};

export default createAccount;
