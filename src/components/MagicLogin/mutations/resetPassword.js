// @flow strict

import { graphql, commitMutationAsync } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  resetPasswordMutationResponse,
  resetPasswordMutation,
} from "./__generated__/resetPasswordMutation.graphql";

const mutation = graphql`
  mutation resetPasswordMutation($email: String!, $brand: String!) {
    resetPassword(email: $email, brand: $brand) {
      success
    }
  }
`;

const resetPassword = (
  environment: Environment,
  email: string,
  brand: string,
): Promise<resetPasswordMutationResponse> =>
  commitMutationAsync<resetPasswordMutation>(environment, {
    mutation,
    variables: {
      email,
      brand,
    },
  }).then(({ response }) => response);

export default resetPassword;
