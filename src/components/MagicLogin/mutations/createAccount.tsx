
import { commitMutation, graphql } from "@kiwicom/relay";
import { Environment } from "@kiwicom/relay";

import {
  createAccountMutationVariables,
  createAccountMutationResponse,
  createAccountInput,
} from "./__generated__/createAccountMutation.graphql";

const createAccountMutation = graphql`
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
): Promise<createAccountMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: createAccountMutationVariables = {
      brand,
      credentials,
    };

    commitMutation(environment, {
      mutation: createAccountMutation,
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default createAccount;
