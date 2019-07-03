// @flow strict

import { graphql, commitMutation } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import type {
  resetPasswordMutationVariables,
  resetPasswordMutationResponse,
} from "./__generated__/resetPasswordMutation.graphql";

const resetPasswordMutation = graphql`
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
  new Promise((resolve, reject) => {
    const variables: resetPasswordMutationVariables = {
      email,
      brand,
    };

    commitMutation(environment, {
      mutation: resetPasswordMutation,
      // $FlowExpected: Broken definition
      variables,
      onCompleted: resolve,
      onError: reject,
    });
  });

export default resetPassword;
