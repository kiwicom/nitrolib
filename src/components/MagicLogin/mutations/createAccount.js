// @flow strict

import { commitMutation, graphql } from "react-relay";

import type {
  createAccountMutationVariables,
  createAccountMutationResponse,
  createAccountInput,
} from "./__generated__/createAccountMutation.graphql";
import environment from "../../../services/environment";

const createAccountMutation = graphql`
  mutation createAccountMutation($brand: Brand!, $credentials: CreateAccountInput!) {
    createAccount(brand: $brand, credentials: $credentials) {
      success
      error
    }
  }
`;

const createAccount = (
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
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default createAccount;
