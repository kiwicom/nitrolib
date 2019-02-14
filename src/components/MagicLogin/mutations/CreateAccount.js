// @flow strict

import { commitMutation, graphql } from "react-relay";

import type {
  CreateAccountMutationVariables,
  CreateAccountMutationResponse,
  CreateAccountInput,
} from "./__generated__/CreateAccountMutation.graphql";
import environment from "../../../services/environment";

const createAccount = graphql`
  mutation CreateAccountMutation($brand: Brand!, $credentials: CreateAccountInput!) {
    createAccount(brand: $brand, credentials: $credentials) {
      success
      error
    }
  }
`;

const CreateAccount = (
  brand: string,
  credentials: CreateAccountInput,
): Promise<CreateAccountMutationResponse> =>
  new Promise((resolve, reject) => {
    const variables: CreateAccountMutationVariables = {
      brand,
      credentials,
    };

    commitMutation(environment, {
      mutation: createAccount,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default CreateAccount;
