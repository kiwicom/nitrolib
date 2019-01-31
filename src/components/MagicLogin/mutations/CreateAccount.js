// @flow

import { graphql } from "react-relay";

import { executeMutation } from "../../../services/utils/relay";
import type {
  CreateAccountMutationVariables,
  CreateAccountMutationResponse,
  CreateAccountInput,
} from "./__generated__/CreateAccountMutation.graphql";

const createAccount = graphql`
  mutation CreateAccountMutation($brand: Brand!, $credentials: CreateAccountInput!) {
    createAccount(brand: $brand, credentials: $credentials) {
      success
      error
    }
  }
`;

export default (
  brand: string,
  credentials: CreateAccountInput,
): Promise<CreateAccountMutationResponse> =>
  executeMutation<CreateAccountMutationVariables, CreateAccountMutationResponse>(createAccount, {
    brand,
    credentials,
  });
